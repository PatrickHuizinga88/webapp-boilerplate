<template>
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end py-6 sm:items-start z-20">
    <LayoutContainer class="w-full">
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <transition-group
            enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
          <UiNotification
              v-for="(notification, index) in notifications"
              :type="notification.type"
              :icon="notification.icon"
              :title="notification.title"
              :key="index">
            {{ notification.message }}
          </UiNotification>
        </transition-group>
      </div>
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
defineProps({
  notifications: Array
})
</script>

<style scoped>

</style>