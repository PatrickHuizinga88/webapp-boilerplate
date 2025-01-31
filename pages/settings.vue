<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import {Page} from "../components/ui/page";

definePageMeta({
  layout: 'default-sidebar'
})

const notificationStore = useNotificationStore()
const {t} = useI18n()

const loading = ref(false)

const formSchema = toTypedSchema(z.object({
  example: z.string(),
}))

const form = useForm({
  initialValues: {
    example: '',
  },
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true

    // Save settings
    console.log(values)

    notificationStore.createNotification({
      type: 'success',
      action: 'save',
      item: t('settings.settings', 2)
    })
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'save',
      item: t('settings.settings', 2)
    })
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <Page :title="$t('settings.settings', 2)">
    <form @submit="onSubmit" class="space-y-6">
      <FormField v-slot="{ componentField }" name="example">
        <FormItem>
          <FormLabel>Example</FormLabel>
          <FormControl>
            <Input v-bind="componentField"/>
          </FormControl>
        </FormItem>
      </FormField>
      <Button :loading="loading">
        {{ $t('common.actions.save', {item: lowercase($t('settings.settings', 2))}) }}
      </Button>
    </form>
  </Page>
</template>
