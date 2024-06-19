<script setup lang="ts">
import {Sheet, SheetContent, SheetTrigger} from "~/components/ui/sheet";
import {Menu, Package2, Home, LogOut, Users, Settings} from "lucide-vue-next";
import {Button} from "~/components/ui/button";
import {useToast} from "~/components/ui/toast";

const supabase = useSupabaseClient()
const { toast } = useToast()

const sidebarOpen = ref<boolean>(false)

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
    navigateTo('/login')
    toast({
      title: 'Succesfully logged out'
    })
  }
}

defineExpose({ sidebarOpen })
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button
          variant="outline"
          size="icon"
          class="shrink-0 md:hidden"
      >
        <Menu class="h-5 w-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="flex flex-col">
      <nav class="grid gap-2 text-lg font-medium">
        <a
            href="#"
            class="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2 class="h-6 w-6" />
          <span class="sr-only">Acme Inc</span>
        </a>
        <a
            href="#"
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Home class="h-5 w-5" />
          Dashboard
        </a>
      </nav>
      <div class="mt-auto">
        ...
      </div>
    </SheetContent>
  </Sheet>

  <div class="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
    <div class="flex grow flex-col overflow-y-auto border-r border-border px-6 pb-4">
      <div class="flex shrink-0 items-center pt-6 pb-10">
        <NuxtLink to="/">
          <img src="~/assets/images/logo.svg" alt="Logo" class="h-10">
        </NuxtLink>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col divide-y divide-border">
          <li v-for="category in navigation" :key="category.name" class="py-7 first:pt-0">
            <div class="text-xs leading-6 text-muted-foreground">{{ category.name }}</div>
            <ul role="list" class="-mx-2 mt-4 space-y-1">
              <li v-for="link in category.links" :key="link.name">
                <Button as-child variant="ghost" class="w-full justify-start hover:bg-foreground/5 p-2">
                  <NuxtLink :href="link.url" active-class="bg-foreground/5">
                    <component :is="link.icon" class="size-5 mr-2" aria-hidden="true"/>
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
    </div>
  </div>

  <div class="sticky top-0 z-40 bg-white dark:bg-black py-4 shadow-sm dark:border-b dark:border-zinc-800 lg:hidden">
    <LayoutContainer>
      <div class="flex items-center gap-x-6">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 dark:text-gray-400 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Menu name="Bars3" class="size-6" aria-hidden="true" />
        </button>
      </div>
    </LayoutContainer>
  </div>
</template>

<style scoped>

</style>