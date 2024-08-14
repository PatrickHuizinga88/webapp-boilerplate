<template>
  <ol v-if="breadcrumbs.length" class="hidden lg:flex items-center space-x-3">
    <li v-for="(crumb, index) in breadcrumbs">
      <div class="flex items-center">
        <NuxtLink :to="crumb.link"
                  :class="[{ 'text-muted-foreground hover:text-foreground': crumb.link }, { 'font-medium': index === breadcrumbs.length - 1 }, { 'mr-3': breadcrumbs.length > 1 }]">
          {{ crumb.title }}
        </NuxtLink>
        <ChevronRight v-if="index !== breadcrumbs.length - 1" class="size-4 flex-shrink-0 text-muted-foreground" role="presentation" aria-hidden="true"/>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  overwrittenRoute?: string
}>()

const breadcrumbs = computed(() => {
  const fullPath = useRoute().fullPath
  const params = fullPath.startsWith('/') ? fullPath.substring(1).split('/') : fullPath.split('/')
  const crumbs: any[] = []

  let path = ''

  params.forEach(param => {
    path = `${path}/${param}`
    const isCurrentRoute = path === useRoute().path

    if (path === '/') {
      param = 'dashboard'
    }
    crumbs.push({
      title: isCurrentRoute && props.overwrittenRoute ? props.overwrittenRoute : capitalize(param.replace(/-/g, ' ')),
      link: isCurrentRoute ? undefined : path
    })
  })

  return crumbs
})
</script>

<style scoped></style>