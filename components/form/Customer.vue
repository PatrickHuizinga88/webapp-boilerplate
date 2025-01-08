<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import {LoaderCircle} from "lucide-vue-next";
import type Customer from "~/types/Customer";

const props = defineProps<{
  customer?: Customer
}>()

const notificationStore = useNotificationStore()

const formSchema = toTypedSchema(z.object({
  name: z.string(),
  email: z.string(),
}))

const form = useForm({
  initialValues: {
    name: props.customer?.name,
    email: props.customer?.email,
  },
  validationSchema: formSchema,
})

const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true
    await $fetch('/api/users', {
      method: props.customer ? 'PUT' : 'POST',
      body: {
        id: props.customer?.id,
        ...values
      }
    })

    notificationStore.createNotification({
      type: 'success',
      action: 'save',
      item: values.name
    })
    navigateTo(`/customers/${useRoute().params.id}`)
  } catch (error) {
    if (error) {
      notificationStore.createNotification({
        type: 'destructive',
        action: 'save',
        item: values.name
      })
      throw error
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>{{ $t('common.general.name') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ $t('common.general.email') }}</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button :disabled="loading">
      <LoaderCircle v-if="loading" class="size-5 animate-spin" />
      {{ $t('common.actions.save', {item: lowercase($t('customers.customers'))}) }}
    </Button>
  </form>
</template>