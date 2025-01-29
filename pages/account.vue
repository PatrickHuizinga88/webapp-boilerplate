<script setup lang="ts">
import {Page} from "../components/ui/page";
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import type {Database} from "~/types/database.types";

definePageMeta({
  layout: 'default-sidebar'
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const notificationStore = useNotificationStore()
const {t} = useI18n()

const loadingProfile = ref(false)

const {data: profile} = await useAsyncData('accountProfile', async () => {
  const {data} = await supabase.from('profiles').select('first_name,last_name').filter('id', 'eq', user.value?.id).single()
  return data
})

const formSchemaProfile = toTypedSchema(z.object({
  first_name: z.string(),
  last_name: z.string()
}))

const formProfile = useForm({
  initialValues: {
    first_name: profile.value.first_name || '',
    last_name: profile.value.last_name || '',
  },
  validationSchema: formSchemaProfile,
})

const onSubmitProfile = formProfile.handleSubmit(async (values) => {
  try {
    loadingProfile.value = true
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
    loadingProfile.value = false
  }
})
</script>

<template>
  <Page :title="$t('account.account')" :description="$t('account.manage_your_account')">

    <section id="profile-information">
      <h2 class="h3 mb-4">Profile Information</h2>
      <form @submit="onSubmitProfile" class="space-y-6">
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
        <Button :loading="loadingProfile" size="sm">
          {{ $t('common.actions.save', {item: lowercase($t('account.profile.profile'))}) }}
        </Button>
      </form>
    </section>

    <Separator class="w-full my-6 sm:my-12"/>

    <section id="account-information">
      <h2 class="h3 mb-4">Account Information</h2>
      <FormAccount v-if="user" :email="user.email"/>
    </section>

    <Separator class="w-full my-6 sm:my-12"/>

    <section id="billing">
      <h2 class="h3 mb-4">Billing</h2>
      <form @submit="onSubmitBIlling">

      </form>
    </section>

    <Separator class="w-full my-6 sm:my-12"/>

    <section id="preferences">
      <h2 class="h3 mb-4">Preferences</h2>
      <form @submit="onSubmit">
      </form>
    </section>

    <Separator class="w-full my-6 sm:my-12"/>

    <section id="danger-zone">
      <h2 class="h3 text-destructive mb-2">Danger Zone</h2>
      <!-- TODO - Setup: Change support email -->
      <p class="text-muted-foreground text-sm mb-6">To permanently delete your account, please contact our support at <a
          href="mailto:support@example.com" class="text-primary underline">support@example.com</a>.</p>
      <!--    <p class="text-muted-foreground text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>-->
      <!--    <Button variant="outline" size="sm">-->
      <!--      <Trash class="size-4"/>-->
      <!--      Delete Account-->
      <!--    </Button>-->
    </section>
  </Page>
</template>

<style scoped>

</style>