<template>
    <form @submit.prevent="emit(submit, form)" class="space-y-6">
        <UiFormField
            id="name"
            label="Name"
            required
        >
            <UiFormInput v-model="form.name" type="text" />
        </UiFormField>

        <UiFormField
            id="email"
            label="Email"
            required
        >
            <UiFormInput v-model="form.email" type="email" />
        </UiFormField>

        <UiFormField
            id="role"
            label="Role"
            required
        >
            <UiFormSelect v-model="form.role" :options="['Admin', 'Subscriber']" />
        </UiFormField>

        <UiButton type="submit" class="text-white bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-500">Save</UiButton>
    </form>
</template>

<script setup lang="ts">
import type User from '~/types/User'

const props = defineProps<{
  user: User
}>()

const form = ref({
    name: props.user?.name || '',
    email: props.user?.email || '',
    role: props.user?.role || ''
})

const emit = defineEmits(['submit'])
</script>
