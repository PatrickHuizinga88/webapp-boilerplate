<template>
  <LayoutPage>
    <section>
      <form @submit.prevent="submit" class="space-y-4">
        <UiFormField
            id="role"
            label="System theme"
            :error="errors.preferredMode"
        >
          <UiFormSelect
              v-model="form.preferredMode"
              :options="['Light', 'Dark', 'System default']"
          />
        </UiFormField>
        <UiButton type="submit" class="bg-primary-500 hover:bg-primary-600 text-white hover:bg-accent mt-2">Save settings</UiButton>
      </form>
    </section>
  </LayoutPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default-sidebar'
})

const notificationStore = useNotificationStore()

const form = reactive({
  preferredMode: 'System default'
})

const errors = reactive({
  preferredMode: ''
})

const submit = () => {
  notificationStore.createNotification({
    title: 'Settings saved',
    message: 'Your settings have been saved successfully.',
    type: 'success',
    icon: 'CheckCircle',
  })
  navigateTo('/')
}
</script>

<style scoped>

</style>