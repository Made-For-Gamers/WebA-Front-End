<script setup>
  // TODO: add google recaptcha

  import { ref, reactive, computed } from 'vue'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  import TextField from '../../Ui/TextField.vue'
  import TextArea from '../../Ui/TextArea.vue'
  import { useAppManagerStore } from '../../../stores/app-manager'

  const appManagerStore = useAppManagerStore()
  const loading = ref(false)
  const valid = computed(() => !Object.keys(form).some(v => !form[v].valid))

  const form = reactive({
    fName: { value: '', valid: false },
    lName: { value: '', valid: false },
    email: { value: '', valid: false },
    message: { value: '', valid: false },
  })

  const submit = async () => {
    try {
      loading.value = true

      const res = await appManagerStore.submitContactForm(
        Object.keys(form).reduce((s, v) => ({ ...s, [v]: form[v].value }), {})
      )

      form = {
        fName: { value: '', valid: false },
        lName: { value: '', valid: false },
        email: { value: '', valid: false },
        message: { value: '', valid: false },
      }
    } catch (err) {}

    loading.value = false
  }
</script>

<template>
  <form class="space-y-4">
    <TextField
      label="Email"
      type="email"
      :rules="[v => !!v || `Please enter a valid Email`, v => v?.includes('@') || 'Please enter a valid email address']"
    />

    <br />
    <br />

    form: {{ form.fName }}

    <button type="button" @click="form.fName = { value: '', valid: false }">Reset</button>

    <br />
    <br />

    <!-- <TextField label="First Name" type="text" @change="(val, err) => (form.fName = { value: val, valid: !err })" />

    <TextField label="Last Name" type="text" @change="(val, err) => (form.lName = { value: val, valid: !err })" />

    <TextField label="Email Address" type="email" @change="(val, err) => (form.email = { value: val, valid: !err })" />

    <TextArea label="Message" type="text" @change="(val, err) => (form.message = { value: val, valid: !err })" /> -->

    <button
      type="button"
      :disabled="!valid || loading"
      :class="`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white
        shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ${valid && !loading ? 'hover:bg-indigo-700' : ''}
        ${valid && !loading ? 'focus:ring-indigo-500' : ''} ${valid && !loading ? 'bg-indigo-600' : 'bg-gray-400'}`"
      @click="submit"
    >
      <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
      <span v-else> Submit</span>
    </button>
  </form>
</template>

<style></style>
