<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {Form} from "../ui/form"
import {Info} from "lucide-vue-next"
import type {Database, Tables} from "~/types/database.types";

const props = defineProps<{
  email: string
}>()

const notificationStore = useNotificationStore()
const supabase = useSupabaseClient<Database>()
const {t} = useI18n()

const emailDialogOpen = ref(false)
const emailSuccess = ref(false)

const formSchema = toTypedSchema(z.object({
  email: z.string(),
}))

const initialValues = {
  email: props.email,
}

const loading = ref(false)

const onSubmit = async (values: any) => {
  try {
    loading.value = true
    const {error} = await supabase.auth.updateUser({
      email: values.email,
    })
    emailDialogOpen.value = false
    if (error) throw error
    notificationStore.createNotification({
      type: 'success',
      action: 'save',
      item: t('common.general.email')
    })
    emailSuccess.value = true
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'save',
      item: t('common.general.email')
    })
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid sm:grid-cols-2">
    <div>
      <div class="space-y-1 5">
        <Label>{{ $t('common.general.email') }}</Label>
        <Input type="email" placeholder="name@example.com" v-model="props.email" disabled/>
      </div>
      <Alert v-if="emailSuccess" variant="info" class="mt-4">
        <Info class="size-4"/>
        <AlertTitle>Confirmation link sent</AlertTitle>
        <AlertDescription>
          Please click on the links sent to your old and new email address to confirm this change.
        </AlertDescription>
      </Alert>
      <Form v-slot="{ handleSubmit }" as="" keep-values :initial-values="initialValues" :validation-schema="formSchema">
        <Dialog v-model:open="emailDialogOpen">
          <DialogTrigger as-child>
            <Button variant="outline" size="sm" class="w-full mt-4">
              {{ $t('common.actions.edit', {item: lowercase($t('common.general.email'))}) }}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{{ $t('common.actions.edit', {item: lowercase($t('common.general.email'))}) }}</DialogTitle>
            </DialogHeader>
            <form id="dialogForm" @submit="handleSubmit($event, onSubmit)" class="grid gap-4">
              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel>{{ $t('common.general.email') }}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" v-bind="componentField"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              </FormField>
              <DialogFooter>
                <Button type="submit" :loading="loading" class="w-full">
                  {{ $t('common.actions.save', {item: lowercase($t('common.general.email'))}) }}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </div>
  </div>
</template>