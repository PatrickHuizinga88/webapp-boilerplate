<script setup lang="ts">
import IconInput from "~/components/ui/IconInput.vue";
import {Search} from "lucide-vue-next";
import NotificationList from "~/components/ui/notification/NotificationList.vue";
import { useNotificationStore } from "~/stores/notificationStore";

const notificationStore = useNotificationStore()

const navItems = [
  {name: 'Home', url: '/'},
  {name: 'About us', url: ''},
  {name: 'Contact', url: ''},
]
</script>

<template>

  <NuxtLoadingIndicator color="#4f46e5"/>

  <LayoutSidebar ref="sidebar"/>

  <div class="lg:pl-72">
    <header class="py-7">
      <LayoutContainer>
        <div class="flex justify-between items-center">
          <div></div>
          <!--          <Breadcrumb>-->
          <!--            <BreadcrumbList>-->
          <!--              <BreadcrumbItem v-for="item in breadcrumbs" :key="item.url">-->
          <!--                <NuxtLink :to="item.url">{{ item.name }}</NuxtLink>-->
          <!--              </BreadcrumbItem>-->
          <!--            </BreadcrumbList>-->
          <!--          </Breadcrumb>-->
          <div class="flex">
            <div class="hidden sm:block">
              <div class="relative w-full max-w-sm items-center">
                <Input id="search" type="text" placeholder="Search..." class="pl-9" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                  <Search class="size-5 text-muted-foreground" />
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Search class="sm:hidden size-5" />
            </Button>
          </div>
        </div>
      </LayoutContainer>
    </header>

    <div class="pt-4 pb-6">
      <LayoutContainer>
        <slot />
      </LayoutContainer>
    </div>
  </div>

  <NotificationList :notifications="notificationStore.notifications" />

</template>