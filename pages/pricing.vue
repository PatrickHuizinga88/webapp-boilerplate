<script setup lang="ts">
import {Page} from "~/components/layout/page";
import {CheckCircle} from "lucide-vue-next";
import {Separator} from "~/components/ui/separator";

definePageMeta({
  layout: 'default-sidebar'
})

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
        <Button size="lg" class="mt-6" :disabled="plan.isCurrentPlan">
          {{ plan.isCurrentPlan ? $t('pricing.current_plan') : $t('pricing.upgrade') }}
        </Button>
      </div>
    </div>
  </div>
</Page>
</template>

<style scoped>

</style>