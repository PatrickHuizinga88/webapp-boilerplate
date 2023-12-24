<template>
  <LayoutPage>
    <section>
      <form @submit.prevent="submit" class="space-y-6">
        <UiFormField
            id="role"
            label="Application theme"
            :error="errors.theme"
        >
          <UiFormSelect
              v-model="theme"
              @change="toggleTheme"
              :options="themeOptions"
          />
        </UiFormField>
        <UiButton type="submit" class="text-white bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover-bg-primary-500">Save settings</UiButton>
      </form>
    </section>
  </LayoutPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default-sidebar'
})

const { theme, toggleTheme } = useTheme()

const notificationStore = useNotificationStore()

const themeOptions = [{
  value: 'light',
  label: 'Light'
}, {
  value: 'dark',
  label: 'Dark'
}, {
  value: '',
  label: 'System default'
}]

const form = reactive({
  theme: ''
})

const errors = reactive({
  theme: ''
})

const submit = () => {
  notificationStore.createNotification({
    title: 'Settings saved',
    message: 'Your settings have been saved successfully.',
    type: 'success',
    icon: 'CheckCircle',
  })
}
</script>

<style scoped>

</style>