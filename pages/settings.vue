<script setup lang="ts">
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
// import {toast} from "vue-sonner";

definePageMeta({
  layout: 'default-sidebar'
})

const { theme, toggleTheme } = useTheme()

const themeOptions = [{
  value: 'light',
  label: 'Light'
}, {
  value: 'dark',
  label: 'Dark'
}, {
  value: 'auto',
  label: 'System default'
}]

const formSchema = toTypedSchema(z.object({
  theme: z.string(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  // toast('Your settings have been saved successfully.')
})
</script>

<template>
  <LayoutPage>
    <section>
      <form @submit="onSubmit" class="space-y-6">
        <FormField v-slot="{ componentField }" name="theme">
          <FormItem>
            <FormLabel>Theme</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem v-for="option in themeOptions" :value="option.value">
                      {{ option.label }}
                    </SelectItem>
                </SelectContent>
              </Select>
          </FormItem>
        </FormField>
        <Button>Save settings</Button>
      </form>
    </section>
  </LayoutPage>
</template>

<style scoped>

</style>