<template>

  <NuxtLoadingIndicator color="#2E994A"/>

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
              <IconInput type="search" class="!w-64" placeholder="Search...">
                <Search class="size-5" aria-hidden="true" />
              </IconInput>
            </div>
            <button>
              <Search class="sm:hidden size-6" />
            </button>
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

<!--  <Toaster />-->

</template>

<script setup lang="ts">
import IconInput from "~/components/ui/IconInput.vue";
import {Search} from "lucide-vue-next";

useHead({
  script: [{
    children:
        `if (localStorage.theme === 'dark' || localStorage.theme === '' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }`
  }]
})

const navItems = [
  {name: 'Home', url: '/'},
  {name: 'About us', url: ''},
  {name: 'Contact', url: ''},
]
</script>