<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import type {Database} from "~/types/database.types";

const props = defineProps<{
  first_name: string
  last_name: string
}>()

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const notificationStore = useNotificationStore()
const {t} = useI18n()

const loading = ref(false)

const formSchema = toTypedSchema(z.object({
  first_name: z.string(),
  last_name: z.string()
}))

const form = useForm({
  initialValues: {
    first_name: props.first_name || '',
    last_name: props.last_name || '',
  },
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true
    const {error} = await supabase.from('profiles').update({
      first_name: values.first_name,
      last_name: values.last_name,
    }).eq('id', user.value?.id)
    if (error) throw error
    notificationStore.createNotification({
      type: 'success',
      action: 'save',
      item: t('account.profile.profile'),
    })
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'save',
      item: t('account.profile.profile'),
    })
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <div class="grid sm:grid-cols-2 gap-6">
      <FormField v-slot="{ componentField }" name="first_name">
        <FormItem>
          <FormLabel>{{ $t('account.profile.first_name') }}</FormLabel>
          <FormControl>
            <Input type="text" placeholder="John" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="last_name">
        <FormItem>
          <FormLabel>{{ $t('account.profile.last_name') }}</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Doe" v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
    </div>
    <Button :loading="loading" size="sm">
      {{ $t('common.actions.save', {item: lowercase($t('account.profile.profile'))}) }}
    </Button>
  </form>
</template>