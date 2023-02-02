<script>
  import { mapActions } from 'pinia'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '../../../stores/app-manager'

  import TextField from '../../Ui/TextField.vue'
  import TextArea from '../../Ui/TextArea.vue'

  export default {
    components: { ArrowPathIcon, TextField, TextArea },

    data: () => ({
      loading: false,
      form: {
        fName: {
          value: 'Lee',
          error: true,
          rules: [v => !!v || 'Please enter your First Name'],
        },
        lName: {
          value: 'Grobler',
          error: false,
          rules: [],
        },
        email: {
          value: 'hello@lee-grobler.com',
          error: true,
          rules: [
            v => !!v || 'Please enter your Email Address',
            v => v?.includes('@') || 'Please enter a valid Email Address',
          ],
        },
        message: {
          value: 'Hi there!',
          error: true,
          rules: [v => !!v || 'Please enter a Message'],
        },
      },
    }),

    computed: {
      valid() {
        return Object.keys(this.form).some(v => !this.form[v].error)
      },
    },

    methods: {
      ...mapActions(useAppManagerStore, ['submitContactForm', 'showAlert']),

      async submit() {
        try {
          this.loading = true

          const res = await this.submitContactForm(
            Object.keys(this.form).reduce((s, v) => ({ ...s, [v]: this.form[v].value }), {})
          )

          // TODO: replace this with an actual message from the server
          this.showAlert({ color: 'success', text: 'Test success message' })

          this.form = {
            fName: { ...this.form.fName, value: '', valid: false },
            lName: { ...this.form.lName, value: '', valid: false },
            email: { ...this.form.email, value: '', valid: false },
            message: { ...this.form.message, value: '', valid: false },
          }
        } catch (err) {
          console.log('err:', err)
          this.showAlert({ color: 'error', timeout: 600000, text: err.message })
        } finally {
          this.loading = false
        }
      },
    },
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
      :disabled="!valid || loading"
      :class="`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white
        shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ${valid && !loading ? 'hover:bg-indigo-700' : ''}
        ${valid && !loading ? 'focus:ring-indigo-500' : ''} ${valid && !loading ? 'bg-indigo-600' : 'bg-gray-400'}`"
      @click="submit"
    >
      <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
      <span v-else>Submit</span>
    </button>
  </form>
</template>

<style></style>
