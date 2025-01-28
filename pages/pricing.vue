<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {CheckCircle, Loader2} from "lucide-vue-next";
import {Separator} from "~/components/ui/separator";
import {Dialog, DialogHeader, DialogTitle, DialogFooter} from "~/components/ui/dialog";

definePageMeta({
  layout: 'default-sidebar'
})

const user = useSupabaseUser()

const loading = ref('')
const open = ref(false)
const transationSuccess = ref(false)

const currency = 'EUR'

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

const checkout = async (lookupKey: string) => {
  try {
    loading.value = lookupKey
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
    console.error(error)
  } finally {
    loading.value = ''
  }
}

const route = useRoute()

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
<Page :title="$t('pricing.pricing')">
  <div class="grid sm:grid-cols-2 gap-6">
    <div v-for="plan in plans" class="flex flex-col bg-background border rounded-2xl p-6">
      <h2 class="font-bold text-xl mb-2">{{ plan.name }}</h2>
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
        <Button
            size="lg"
            class="mt-6"
            :disabled="plan.isCurrentPlan || loading === plan.lookupKey"
            @click="checkout(plan.lookupKey)">
          <Loader2 v-if="loading === plan.lookupKey" class="size-5 animate-spin"/>
          {{ plan.isCurrentPlan ? $t('pricing.current_plan') : $t('pricing.upgrade') }}
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