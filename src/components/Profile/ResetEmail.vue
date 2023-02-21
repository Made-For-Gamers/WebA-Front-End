<script setup>
  import { reactive, computed } from 'vue'
  import { onMounted } from 'vue'

  import TextField from '../Layout/TextField.vue'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'
  import { useAppManagerStore } from '../../stores/app-manager'
  import { useUserStore } from '../../stores/user'

  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()

  const emit = defineEmits(['toggleLoading'])
  const props = defineProps({
    user: Object,
    loading: Boolean,
  })

  const form = reactive({
    email1: {
      value: '',
      error: true,
      rules: [
        v => !!v || 'Please enter your Email Address',
        v => v?.includes('@') || 'Please enter a valid Email Address',
      ],
    },
    email2: {
      value: '',
      error: true,
      rules: [
        v => !!v || 'Please enter your Email Address Again',
        v => v === form.email1.value || "Email Addresses don't match",
      ],
    },
  })

  // onMounted(() => {
  //   form.fName = { ...form.fName, value: props.user.firstName, error: true }
  //   form.lName = { ...form.lName, value: props.user.lastName, error: false }
  // })

  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const submit = async () => {
    try {
      emit('toggleLoading')

      const res = await userStore.updateProfile({ email: form.email1.value })

      form.email1 = { ...form.email1, value: '', error: true }
      form.email2 = { ...form.email2, value: '', error: true }

      // TODO: replace this with an actual message from the server
      appManagerStore.showAlert({
        color: 'success',
        text: "We've emailed you with instructions on how to reset your email address",
      })
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({ color: 'error', text: err.message })
    }

    emit('toggleLoading')
  }
</script>

<template>
  <form class="space-y-4">
    <h3 class="text-2xl font-medium">Reset Email Address</h3>

    <text-field
      type="email"
      label="Current Email Address"
      :value="form.email1.value"
      :error="form.email1.error"
      :rules="form.email1.rules"
      @value="val => (form.email1.value = val)"
      @error="err => (form.email1.error = err)"
    />

    <text-field
      type="email"
      label="Current Email Address Again"
      :value="form.email2.value"
      :error="form.email2.error"
      :rules="form.email2.rules"
      @value="val => (form.email2.value = val)"
      @error="err => (form.email2.error = err)"
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
      <div v-else class="flex items-center gap-4">Reset</div>
    </button>
  </form>
</template>

<style></style>
