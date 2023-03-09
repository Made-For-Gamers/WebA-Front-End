<script setup>
  import { reactive, computed } from 'vue'
  import { mapActions } from 'pinia'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '@/stores/app-manager'
  import { useUserStore } from '@/stores/user'

  import router from '@/router'
  import TextField from '@/components/Layout/TextField.vue'
  import TextArea from '@/components/Layout/TextArea.vue'

  const emit = defineEmits(['toggleLoading'])
  const props = defineProps({ loading: Boolean })

  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()

  const form = reactive({
    email: {
      value: '',
      error: true,
      rules: [
        v => !!v || 'Please enter your Email Address',
        v => v?.includes('@') || 'Please enter a valid Email Address',
      ],
    },
    password: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a Password'],
    },
  })

  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const submit = async () => {
    emit('toggleLoading')

    grecaptcha.enterprise.ready(() => {
      try {
        grecaptcha.enterprise
          .execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'login' })
          .then(async recaptcha_token => {
            const res = await userStore.loginWithEmailAndPassword(
              Object.keys(form).reduce((s, v) => ({ ...s, [v]: form[v].value }), { recaptcha_token })
            )

            appManagerStore.showAlert({ color: 'success', text: 'Login successful' })

            form.email = { ...form.email, value: '', error: true }
            form.password = { ...form.password, value: '', error: true }
            form.name = { ...form.name, value: '', error: true }

            emit('toggleLoading')
            router.push('/projects')
          })
          .catch(err => {
            emit('toggleLoading')
            console.log('err A:', err)
            appManagerStore.showAlert({
              color: 'error',
              text:
                err.message ||
                'An unknown error occurred. Please try again later and if the problem persists, contact support.',
            })
          })
      } catch (err) {
        emit('toggleLoading')
        console.log('err B:', err)
        appManagerStore.showAlert({
          color: 'error',
          text:
            err.message ||
            'An unknown error occurred. Please try again later and if the problem persists, contact support.',
        })
      }
    })
  }
</script>

<template>
  <form class="space-y-4">
    <TextField
      type="email"
      label="Email Address"
      :value="form.email.value"
      :error="form.email.error"
      :rules="form.email.rules"
      @value="val => (form.email.value = val)"
      @error="err => (form.email.error = err)"
    />

    <TextField
      type="password"
      label="Password"
      :value="form.password.value"
      :error="form.password.error"
      :rules="form.password.rules"
      @value="val => (form.password.value = val)"
      @error="err => (form.password.error = err)"
    />

    <button
      type="button"
      :disabled="invalid || loading"
      :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${!invalid && !loading ? 'hover:bg-[#c71610a0]' : ''}
        ${!invalid && !loading ? 'bg-[#C71610]' : 'bg-gray-400'} w-full text-2xl text-white shadow-sm`"
      @click="submit"
    >
      <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
      <div v-else class="flex items-center gap-4">Sign In</div>
    </button>
  </form>
</template>

<style></style>
