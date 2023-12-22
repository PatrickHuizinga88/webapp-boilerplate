<template>
  <ol v-if="breadcrumbs.length" class="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
    <li>
      <div>
        <NuxtLink to="/" class="hover:text-gray-600 hover:dark:text-gray-300">
          <UiIcon name="Home" class="h-4 w-4 flex-shrink-0" aria-hidden="true" solid/>
          <span class="sr-only">Home</span>
        </NuxtLink>
      </div>
    </li>
    <li v-for="crumb in breadcrumbs">
      <div class="flex items-center">
        <svg class="h-4 w-4 flex-shrink-0 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
        </svg>
        <NuxtLink :to="crumb.link" class="ml-3" :class="{'hover:text-gray-600 hover:dark:text-gray-300' : crumb.link}">
          {{ crumb.title }}
        </NuxtLink>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
const breadcrumbs = computed(() => {
  const fullPath = useRoute().fullPath
  const params = fullPath.startsWith('/')
      ? fullPath.substring(1).split('/')
      : fullPath.split('/')
  const crumbs: any[] = []

  let path = ''

  params.forEach((param, index) => {
    path = `${path}/${param}`
    const isCurrentRoute = path === useRoute().path

    if (useRoute().path !== '/') {
      crumbs.push({
        title: capitalize(param.replace(/-/g, ' ')),
        link: isCurrentRoute ? undefined : path
      })
    }
  })

  return crumbs
})
</script>

<style scoped>

</style>