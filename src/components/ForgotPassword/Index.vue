<script>
  import { mapActions } from 'pinia'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '../../stores/app-manager'
  import { useUserStore } from '../../stores/user'

  import TextField from '../Layout/TextField.vue'
  import TextArea from '../Layout/TextArea.vue'

  export default {
    components: { ArrowPathIcon, TextField, TextArea },

    data: () => ({
      loading: false,
      form: {
        email: {
          value: '',
          error: true,
          rules: [
            v => !!v || 'Please enter your Email Address',
            v => v?.includes('@') || 'Please enter a valid Email Address',
          ],
        },
      },
    }),

    computed: {
      valid() {
        return !Object.keys(this.form).some(v => this.form[v].error)
      },
    },

    methods: {
      ...mapActions(useAppManagerStore, ['showAlert']),
      ...mapActions(useUserStore, ['triggerForgotPassword']),

      async submit() {
        try {
          this.loading = true

          const res = await this.triggerForgotPassword(
            Object.keys(this.form).reduce((s, v) => ({ ...s, [v]: this.form[v].value }), {})
          )

          // TODO: replace this with an actual message from the server
          this.showAlert({
            color: 'success',
            text: 'Thank you. Please check your email for instructions on how to reset your password.',
          })

          this.form = {
            email: { ...this.form.email, value: '', valid: false },
          }

          this.$router.push('/sign-in')
        } catch (err) {
          console.log('err:', err)
          this.showAlert({ color: 'error', text: err.message })
        }

        this.loading = false
      },
    },
  }
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52 flex flex-col gap-4">
    <form class="space-y-4">
      <text-field
        type="email"
        label="Email Address"
        :value="form.email.value"
        :error="form.email.error"
        :rules="form.email.rules"
        @value="val => (form.email.value = val)"
        @error="err => (form.email.error = err)"
      />

      <button
        type="button"
        :disabled="!valid || loading"
        :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${valid && !loading ? 'hover:bg-[#c71610a0]' : ''}
        ${valid && !loading ? 'bg-[#C71610]' : 'bg-gray-400'} w-full text-2xl text-white shadow-sm`"
        @click="submit"
      >
        <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
        <div v-else class="flex items-center gap-4">Submit</div>
      </button>
    </form>
  </section>
</template>

<style></style>
