<script setup lang="ts">
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import {useNotificationStore} from "~/stores/notificationStore";
import {Sidebar} from "~/components/ui/sidebar";

const notificationStore = useNotificationStore()
</script>

<template>

  <NuxtLoadingIndicator :color="`hsl(var(--primary))`"/>

  <Sidebar ref="sidebar"/>

  <div class="lg:pl-64 overflow-x-hidden">
    <div class="container">
      <div class="pb-6">
        <slot/>
      </div>
    </div>
  </div>

  <NotificationList :notifications="notificationStore.notifications"/>

</template>