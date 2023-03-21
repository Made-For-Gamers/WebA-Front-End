<script setup>
  import { ref, reactive, computed } from 'vue'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'
  import { useRouter } from 'vue-router'

  import { useAppManagerStore } from '@/stores/app-manager'
  import { useUserStore } from '@/stores/user'
  import router from '@/router'
  import TextField from '@/components/Layout/TextField.vue'

  const { currentRoute } = useRouter()
  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()

  const loading = ref(false)
  const form = reactive({
    new_password: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter your New Password'],
    },
    pass2: {
      value: '',
      error: true,
      rules: [
        v => !!v || 'Please enter your new Password Again',
        v => v === form.new_password.value || "Your new Passwords don't match",
      ],
    },
  })

  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const submit = async () => {
    loading.value = true

    grecaptcha.enterprise.ready(() => {
      try {
        grecaptcha.enterprise
          .execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'reset_password' })
          .then(async recaptcha_token => {
            const res = await userStore.resetPassword(
              Object.keys(form).reduce((s, v) => ({ ...s, [v]: form[v].value }), {
                recaptcha_token,
                token: currentRoute.value.query.token,
              })
            )

            if (!res.result) throw new Error(res.message)
            appManagerStore.showAlert({ color: 'success', text: res.message })

            form.new_password = { ...form.new_password, value: '', error: true }
            form.pass2 = { ...form.pass2, value: '', error: true }

            loading.value = false
            router.push('/sign-in')
          })
          .catch(err => {
            loading.value = false
            console.log('err A:', err)
            appManagerStore.showAlert({
              color: 'error',
              text:
                err.message ||
                'An unknown error occurred. Please try again later and if the problem persists, contact support.',
            })
          })
      } catch (err) {
        loading.value = false
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
  <section class="w-1/2 flex flex-col gap-4 rounded-lg shadow-lg bg-blue-50 p-6">
    <h5 class="text-slate-400 px-2 text-center uppercase">Reset Password</h5>

    <form class="space-y-4">
      <TextField
        type="password"
        label="New Password"
        :value="form.new_password.value"
        :error="form.new_password.error"
        :rules="form.new_password.rules"
        @value="val => (form.new_password.value = val)"
        @error="err => (form.new_password.error = err)"
      />

      <TextField
        type="password"
        label="Password Again"
        :value="form.pass2.value"
        :error="form.pass2.error"
        :rules="form.pass2.rules"
        @value="val => (form.pass2.value = val)"
        @error="err => (form.pass2.error = err)"
      />

      <button
        type="button"
        :disabled="invalid || loading"
        :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
          focus:outline-none focus:ring-2 focus:ring-offset-2 $${!invalid && !loading ? 'hover:bg-indigo-700' : ''}
        ${!invalid && !loading ? 'bg-indigo-600' : 'bg-gray-400'} w-full text-2xl text-white shadow-sm`"
        @click="submit"
      >
        <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
        <span v-else>Reset Password</span>
      </button>
    </form>
  </section>
</template>

<style></style>
