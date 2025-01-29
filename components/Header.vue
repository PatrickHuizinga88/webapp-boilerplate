<script setup lang="ts">
import { Search, Menu, Bell } from 'lucide-vue-next'
import { Sheet, SheetTrigger, SheetContent } from '~/components/ui/sheet';

defineProps<{
  pageTitle: string
  pageDescription?: string
  // showBreadcrumbs?: boolean
  // customBreadcrumb?: string
}>()

const open = ref(false)

watch(useRoute(), () => {
  open.value = false
})
</script>

<template>
	<header class="py-6 lg:pb-10">
		<div class="flex justify-between items-start gap-6">
			<Sheet v-model:open="open">
				<SheetTrigger as-child>
					<Button variant="ghost" size="icon" aria-label="Toggle navigation menu" class="shrink-0 lg:hidden -ml-2">
						<Menu class="size-6" aria-hidden="true" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" class="sm:max-w-xs flex flex-col">
					<Navigation />
				</SheetContent>
			</Sheet>

      <div class="hidden lg:flex lg:flex-col shrink overflow-hidden mt-1.5">
        <h1 v-if="pageTitle" class="h2 align-middle">{{ pageTitle }}</h1>
        <div v-if="pageDescription" class="text-muted-foreground mt-1">{{ pageDescription }}</div>
      </div>

<!--			<LayoutBreadcrumbs v-if="showBreadcrumbs" :overwrittenRoute="customBreadcrumb" />-->

			<div class="flex gap-x-2">
        <Button variant="ghost" size="icon" :aria-label="$t('common.general.notifications')" class="text-muted-foreground">
          <Bell aria-hidden="true" />
        </Button>
				<div class="hidden sm:block">
					<div class="relative w-full max-w-sm items-center">
						<Input id="search" type="search" :placeholder="$t('common.general.search') + '...'" class="pl-9" />
						<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2 pointer-events-none" aria-hidden="true">
							<Search class="size-5 text-muted-foreground"/>
						</span>
					</div>
				</div>
				<Button variant="ghost" size="icon" class="sm:hidden text-muted-foreground" :aria-label="$t('common.general.search')">
					<Search aria-hidden="true" />
				</Button>
			</div>
		</div>

    <div class="lg:hidden shrink overflow-hidden pt-7">
      <h1 v-if="pageTitle" class="h2">{{ pageTitle }}</h1>
      <div v-if="pageDescription" class="text-muted-foreground mt-1">{{ pageDescription }}</div>
    </div>
	</header>
</template>