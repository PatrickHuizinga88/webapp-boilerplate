<script setup lang="ts">
import StatCard from "~/components/ui/StatCard.vue";
import Card from "~/components/ui/Card.vue";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { ArrowRight } from 'lucide-vue-next';

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
    date: '3 weeks ago'
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
      <Card title="Recent registered users" description="In the last 30 days" class="col-span-1 md:col-span-2 2xl:col-span-1">
        <template #action>
          <Button variant="ghost" size="sm" as-child>
            <NuxtLink to="users">
              View all
              <ArrowRight class="w-4 h-4 ml-1" aria-hidden="true" />
            </NuxtLink>
          </Button>
        </template>
        <ul class="space-y-4">
          <li v-for="user in recentUsers" class="flex items-center">
            <Avatar>
              <AvatarFallback>{{ user.avatar }}</AvatarFallback>
            </Avatar>
            <div class="text-sm ml-4">
              <NuxtLink :to="`/users/${user.id}`" class="font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{{ user.name }}</NuxtLink>
              <div class="text-muted-foreground">{{ user.date }}</div>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  </LayoutPage>
</template>