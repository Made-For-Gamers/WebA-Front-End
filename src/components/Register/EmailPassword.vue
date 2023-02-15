<script setup>
  import { defineProps, reactive, computed } from 'vue'
  import { mapActions } from 'pinia'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '../../stores/app-manager'
  import { useUserStore } from '../../stores/user'

  import router from '../../router'
  import TextField from '../Layout/TextField.vue'
  import TextArea from '../Layout/TextArea.vue'

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
    try {
      emit('toggleLoading')

      const res = await userStore.loginWithEmailAndPassword(
        Object.keys(form).reduce((s, v) => ({ ...s, [v]: form[v].value }), {})
      )

      // TODO: replace this with an actual message from the server
      appManagerStore.showAlert({ color: 'success', text: "You've successfully been logged in" })

      form.email = { ...form.email, value: '', error: false }
      form.password = { ...form.password, value: '', error: false }

      router.push('/dashboard')
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({ color: 'error', text: err.message })
    }

    emit('toggleLoading')
  }
</script>

<template>
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

    <text-field
      type="text"
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
      <div v-else class="flex items-center gap-4">Register</div>
    </button>
  </form>
</template>

<style></style>
