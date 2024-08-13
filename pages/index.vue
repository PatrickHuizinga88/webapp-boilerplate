<script setup lang="ts">
import StatCard from "~/components/ui/StatCard.vue";
import Card from "~/components/ui/Card.vue";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

definePageMeta({
  layout: 'default-sidebar'
})

const recentUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    avatar: 'LG',
    date: '3 days ago'
  },
  {
    id: 2,
    name: 'Ervin Howell',
    avatar: 'EH',
    date: '5 days ago'
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    avatar: 'CB',
    date: '2 weeks ago'
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    avatar: 'PL',
    date: '1 month ago'
  }
]
</script>

<template>
  <LayoutPage title="Welcome, Patrick! 👋">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <StatCard title="Customers" :stat="123" :difference="12.5" subtitle="compared to last week"/>
      <StatCard title="Users" :stat="10"/>
      <StatCard title="Last sign in" :stat="'Yesterday'"/>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <Card class="col-span-full md:col-span-2 2xl:col-span-3">
        <template #header>
          <h3 class="font-medium">
            Revenue history
          </h3>
        </template>
        <div class="mt-5">
          <!-- Graph -->
        </div>
      </Card>
      <Card class="col-span-1 md:col-span-2 2xl:col-span-1">
        <template #header>
          <h3 class="font-medium">
            Recent registered users
          </h3>
        </template>
        <div class="mt-5 border-t border-border">
          <ul>
            <li v-for="user in recentUsers" class="flex items-center px-4 py-4 sm:px-6">
              <Avatar>
                <AvatarFallback>{{ user.avatar }}</AvatarFallback>
              </Avatar>
              <div class="text-sm ml-4">
                <NuxtLink :to="`/users/${user.id}`" class="font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{{ user.name }}</NuxtLink>
                <div class="text-muted-foreground">{{ user.date }}</div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  </LayoutPage>
</template>