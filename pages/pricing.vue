<script setup lang="ts">
import {Page} from "../components/ui/page";
import {CheckCircle, LoaderCircle} from "lucide-vue-next";
import {Separator} from "~/components/ui/separator";
import {Dialog, DialogHeader, DialogTitle, DialogFooter} from "~/components/ui/dialog";
import type {Database} from "~/types/database.types";

definePageMeta({
  layout: 'default-sidebar'
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const notificationStore = useNotificationStore()
const route = useRoute()
const {t} = useI18n()

const loading = ref('')
const open = ref(false)
const transationSuccess = ref(false)

const currency = 'EUR'

// TODO - Setup: Configure or remove plans
const plans = [
  {
    name: 'Free plan',
    description: 'Perfect for small teams that want to get started with our product.',
    pricing: '0',
    featuresTitle: 'Included features:',
    features: [
      { name: 'Customers analytics & insight' },
      { name: '5 users' },
      { name: 'Basic support' },
    ],
    isCurrentPlan: true,
  },
  {
    lookupKey: 'premium_monthly',
    name: 'Premium plan',
    description: 'Better for growing teams that want to scale their business.',
    pricing: '29',
    featuresTitle: 'Everything in Free plan, plus:',
    features: [
      { name: 'Advanced analytics & insights' },
      { name: 'Unlimited users' },
      { name: 'Priority support' },
      { name: 'Custom branding' },
    ],
    isCurrentPlan: false,
  }
]

const {data: profile} = await useAsyncData('profile', async () => {
  const {data} = await supabase.from('profiles').select('plan').filter('id', 'eq', user.value?.id).single()
  return data
})

const actionText = (lookupKey: string) => {
  if (profile.value.plan === lookupKey) {
    return t('pricing.current_plan')
  }

  if (!lookupKey) {
    return t('pricing.downgrade')
  }

  return t('pricing.upgrade')
}

const checkout = async (lookupKey?: string) => {
  try {
    loading.value = lookupKey || ''
    const url = await $fetch('/api/stripe/create-checkout-session', {
      query: {
        lookupKey,
        stripeCustomerId: user.value?.user_metadata.stripe_customer_id
      }
    })

    if (!url) {
      throw new Error('Failed to create checkout session')
    }

    if (url) {
      navigateTo(url, {
        external: true,
      })
    }
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      isError: true,
    })
    console.error(error)
  } finally {
    loading.value = ''
  }
}

onMounted(async () => {
  if (!route.query.success) {
    return
  }

  if (route.query.success === 'true') {
    await $fetch('/api/stripe/update-subscription', {
      query: {
        stripeCustomerId: user.value?.user_metadata.stripe_customer_id
      }
    })
    transationSuccess.value = true
  }

  if (route.query.success === 'false') {
    transationSuccess.value = false
  }

  open.value = true
})
</script>

<template>
<Page :title="$t('pricing.choose_your_plan')" :description="$t('pricing.ready_to_upgrade')">
<!--  <h2 class="h1">{{ $t('pricing.choose_your_plan') }}</h2>-->
<!--  <p class="text-muted-foreground mt-2">{{ $t('pricing.ready_to_upgrade') }}</p>-->
  <div class="grid sm:grid-cols-2 gap-6">
    <div v-for="plan in plans" class="flex flex-col bg-background border rounded-2xl p-6">
      <h3 class="font-bold mb-2">{{ plan.name }}</h3>
      <p class="text-muted-foreground text-sm">{{ plan.description }}</p>
      <div class="flex text-5xl font-semibold mt-6">
        {{ (currency === 'EUR' ? '€' : '$') + plan.pricing }}
        <span class="text-base text-muted-foreground ml-1">
          {{ currency === 'EUR' ? 'EUR' : 'US' }}
        </span>
      </div>
      <Separator class="w-full my-6"/>
      <h3 class="text-sm text-muted-foreground mb-3">{{ plan.featuresTitle }}</h3>
      <ul class="space-y-3 text-sm">
        <li v-for="feature in plan.features" class="flex items-center font-medium">
          <CheckCircle class="size-4 mr-2"/>
          {{ feature.name }}
        </li>
      </ul>
      <div class="mt-auto">
<!--        TODO: Add link to manage subscription to button -->
        <Button
            size="lg"
            class="w-full sm:w-auto mt-6"
            :variant="!plan.lookupKey ? 'outline' : 'default'"
            :loading="loading === plan.lookupKey"
            :disabled="profile.plan === plan.lookupKey"
            @click="!plan.lookupKey ? null : checkout(plan.lookupKey)">
          <LoaderCircle v-if="loading === plan.lookupKey" class="animate-spin"/>
          {{ actionText(plan.lookupKey) }}
        </Button>
      </div>
    </div>
  </div>

  <Dialog v-model:open="open">
    <DialogContent class="text-center">
      <DialogHeader>
        <DialogTitle class="text-center">
          {{ transationSuccess ?
            $t('pricing.upgrade_confirmation.title.success') :
            $t('pricing.upgrade_confirmation.title.error')
          }}
        </DialogTitle>
      </DialogHeader>
      <p>{{
          transationSuccess ?
              $t('pricing.upgrade_confirmation.description.success') :
              $t('pricing.upgrade_confirmation.description.error')
        }}</p>
      <DialogFooter>
        <Button @click="open = false" :variant="transationSuccess ? 'default' : 'outline'" class="w-full">
          {{ transationSuccess ?
                $t('pricing.upgrade_confirmation.action.success') :
                $t('pricing.upgrade_confirmation.action.error')
          }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</Page>
</template>

<style scoped>

</style>