<script setup lang="ts">
import { Home, LogOut, Users, Settings } from "lucide-vue-next";

const supabase = useSupabaseClient()
const notificationStore = useNotificationStore()

const navigation = [
  {
    name: 'General',
    links: [
      { name: 'Dashboard', url: '/', icon: Home },
      { name: 'Users', url: '/users', icon: Users },
      { name: 'Settings', url: '/settings', icon: Settings },
    ]
  }
]

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    await navigateTo('/login')
    notificationStore.createNotification({
      title: 'Logged out successfully',
      description: 'You have been logged out',
      type: 'success'
    })
  }
}
</script>

<template>
  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col divide-y divide-border">
      <li v-for="category in navigation" :key="category.name" class="py-7 first:pt-0">
        <div class="text-xs leading-6 text-muted-foreground">{{ category.name }}</div>
        <ul role="list" class="-mx-2 mt-4 space-y-1">
          <li v-for="link in category.links" :key="link.name">
            <Button as-child variant="ghost" class="w-full justify-start hover:bg-foreground/5 p-2">
              <NuxtLink :href="link.url" active-class="bg-foreground/5">
                <component :is="link.icon" class="size-5 mr-2" aria-hidden="true" />
                {{ link.name }}
              </NuxtLink>
            </Button>
          </li>
        </ul>
      </li>
    </ul>

    <ul role="list" class="-mx-2 mt-auto space-y-1">
      <li>
        <Button @click="signOut" variant="ghost" class="w-full justify-start">
          <LogOut class="size-5 shrink-0 mr-2" aria-hidden="true" />
          Logout
        </Button>
      </li>
    </ul>
  </nav>
</template>