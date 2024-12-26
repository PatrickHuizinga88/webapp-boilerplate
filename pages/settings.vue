<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";

definePageMeta({
  layout: 'default-sidebar'
})

const notificationStore = useNotificationStore()
const colorMode = useColorMode()
const {t} = useI18n()

const themeOptions = [{
  value: 'light',
  label: t('light')
}, {
  value: 'dark',
  label: t('dark')
}, {
  value: 'system',
  label: t('system_default')
}]

const formSchema = toTypedSchema(z.object({
  theme: z.string(),
}))

const form = useForm({
  initialValues: {
    theme: colorMode.preference
  },
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  colorMode.preference = values.theme
  notificationStore.createNotification({
    title: `${t('settings')} saved`,
    description: 'Your settings have been saved successfully.',
    type: 'success'
  })
})
</script>

<template>
  <LayoutPage>
    <section>
      <form @submit="onSubmit" class="space-y-6">
        <FormField v-slot="{ componentField }" name="theme">
          <FormItem>
            <FormLabel>{{ $t('theme') }}</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue :placeholder="$t('select_a_theme')"/>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem v-for="option in themeOptions" :value="option.value">
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>
        <Button>{{ $t('save') + ' ' + lowercase($t('settings')) }}</Button>
      </form>
    </section>
  </LayoutPage>
</template>
