<script setup>
  import { ref, reactive, computed } from 'vue'
  import { mapActions } from 'pinia'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '../../../stores/app-manager'
  import TextField from '../../Layout/TextField.vue'
  import TextArea from '../../Layout/TextArea.vue'

  const appManagerStore = useAppManagerStore()

  const loading = ref(false)
  const form = reactive({
    fName: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter your First Name'],
    },
    lName: {
      value: '',
      error: false,
      rules: [],
    },
    email: {
      value: '',
      error: true,
      rules: [
        v => !!v || 'Please enter your Email Address',
        v => v?.includes('@') || 'Please enter a valid Email Address',
      ],
    },
    message: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a Message'],
    },
  })

  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const submit = async () => {
    try {
      loading.value = true

      const res = await appManagerStore.submitContactForm(
        Object.keys(form).reduce((s, v) => ({ ...s, [v]: form[v].value }), {})
      )

      // TODO: replace this with an actual message from the server
      appManagerStore.showAlert({ color: 'success', text: 'Test success message' })

      form.fName = { ...form.fName, value: '', valid: false }
      form.lName = { ...form.lName, value: '', valid: false }
      form.email = { ...form.email, value: '', valid: false }
      form.message = { ...form.message, value: '', valid: false }
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({ color: 'error', text: err.message })
    }

    loading.value = false
  }
</script>

<template>
  <form class="space-y-4">
    <text-field
      type="text"
      label="First Name"
      :value="form.fName.value"
      :error="form.fName.error"
      :rules="form.fName.rules"
      @value="val => (form.fName.value = val)"
      @error="err => (form.fName.error = err)"
    />

    <text-field
      type="text"
      label="Last Name"
      :value="form.lName.value"
      :error="form.lName.error"
      :rules="form.lName.rules"
      @value="val => (form.lName.value = val)"
      @error="err => (form.lName.error = err)"
    />

    <text-field
      type="email"
      label="Email Address"
      :value="form.email.value"
      :error="form.email.error"
      :rules="form.email.rules"
      @value="val => (form.email.value = val)"
      @error="err => (form.email.error = err)"
    />

    <text-area
      label="Message"
      :rows="4"
      :value="form.message.value"
      :error="form.message.error"
      :rules="form.message.rules"
      @value="val => (form.message.value = val)"
      @error="err => (form.message.error = err)"
    />

    <button
      type="button"
      :disabled="invalid || loading"
      :class="`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${!invalid && !loading ? 'hover:bg-indigo-700' : ''}
        shadow-sm ${!invalid && !loading ? 'focus:ring-indigo-500' : ''}
        ${!invalid && !loading ? 'bg-indigo-600' : 'bg-gray-400'}`"
      @click="submit"
    >
      <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
      <span v-else>Submit</span>
    </button>
  </form>
</template>

<style></style>
