<template>
	<header class="px-4 sm:px-6 py-7">

		<div class="flex justify-between items-center">
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

			<LayoutBreadcrumbs v-if="showBreadcrumbs" :overwrittenRoute="customBreadcrumb" />

			<div class="flex">
				<div class="hidden sm:block">
					<div class="relative w-full max-w-sm items-center">
						<Input id="search" type="text" :placeholder="$t('common.general.search') + '...'" class="pl-9" />
						<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2 pointer-events-none" aria-hidden="true">
							<Search class="size-5 text-muted-foreground"/>
						</span>
					</div>
				</div>
				<Button variant="ghost" size="icon" class="sm:hidden" :aria-label="$t('common.general.search')">
					<Search class="size-5" aria-hidden="true" />
				</Button>
			</div>
		</div>

	</header>
</template>

<script setup lang="ts">
import { Search, Menu } from 'lucide-vue-next'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

defineProps<{
	showBreadcrumbs?: boolean
	customBreadcrumb?: string
}>()

const open = ref(false)

watch(useRoute(), () => {
 	open.value = false
})
</script>