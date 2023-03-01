<script setup>
  import { ref, reactive, computed } from 'vue'
  import { mapActions } from 'pinia'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '@/stores/app-manager'
  import { useUserStore } from '@/stores/user'

  import router from '@/router'
  import TextField from '@/components/Layout/TextField.vue'
  import TextArea from '@/components/Layout/TextArea.vue'

  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()

  const loading = ref(false)
  const form = reactive({
    email: {
      value: '',
      error: true,
      rules: [
        v => !!v || 'Please enter your Email Address',
        v => v?.includes('@') || 'Please enter a valid Email Address',
      ],
    },
  })

  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const submit = async () => {
    try {
      loading.value = true

      const res = await userStore.triggerForgotPassword(
        Object.keys(form).reduce((s, v) => ({ ...s, [v]: form[v].value }), {})
      )

      // TODO: replace this with an actual message from the server
      appManagerStore.showAlert({
        color: 'success',
        text: 'Thank you. Please check your email for instructions on how to reset your password.',
      })

      form.email = { ...form.email, value: '', error: false }

      router.push('/sign-in')
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({ color: 'error', text: err.message })
    }

    loading.value = false
  }
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52 flex flex-col gap-4">
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

      <button
        type="button"
        :disabled="invalid || loading"
        :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${!invalid && !loading ? 'hover:bg-[#c71610a0]' : ''}
        ${!invalid && !loading ? 'bg-[#C71610]' : 'bg-gray-400'} w-full text-2xl text-white shadow-sm`"
        @click="submit"
      >
        <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
        <div v-else class="flex items-center gap-4">Submit</div>
      </button>
    </form>
  </section>
</template>

<style></style>
