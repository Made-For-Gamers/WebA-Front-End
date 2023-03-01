<script setup>
  import { reactive, computed } from 'vue'
  import { onMounted } from 'vue'

  import TextField from '@/components/Layout/TextField.vue'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'
  import { useAppManagerStore } from '@/stores/app-manager'
  import { useUserStore } from '@/stores/user'

  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()

  const emit = defineEmits(['toggleLoading'])
  const props = defineProps({
    user: Object,
    loading: Boolean,
  })

  const form = reactive({
    password1: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter your current Password'],
    },
    password2: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter your new Password', v => v.length >= 6 || 'Please enter at least 6 characters'],
    },
    password3: {
      value: '',
      error: true,
      rules: [
        v => !!v || 'Please enter your new Password Again',
        v => v === form.password2.value || "Your new Passwords don't match",
      ],
    },
  })

  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const submit = async () => {
    try {
      emit('toggleLoading')

      const res = await userStore.changePassword({
        oldPassword: form.password1.value,
        newPassword: form.password2.value,
      })

      form.password1 = { ...form.password1, value: '', error: true }
      form.password2 = { ...form.password2, value: '', error: true }
      form.password3 = { ...form.password3, value: '', error: true }

      // TODO: replace this with an actual message from the server
      appManagerStore.showAlert({ color: 'success', text: 'Password successfully updated' })
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({ color: 'error', text: err.message })
    }

    emit('toggleLoading')
  }
</script>

<template>
  <form class="space-y-4">
    <h3 class="text-2xl font-medium">Change Password</h3>

    <TextField
      type="password"
      label="Current Password"
      :value="form.password1.value"
      :error="form.password1.error"
      :rules="form.password1.rules"
      @value="val => (form.password1.value = val)"
      @error="err => (form.password1.error = err)"
    />

    <TextField
      type="password"
      label="New Password"
      :value="form.password2.value"
      :error="form.password2.error"
      :rules="form.password2.rules"
      @value="val => (form.password2.value = val)"
      @error="err => (form.password2.error = err)"
    />

    <TextField
      type="password"
      label="New Password Again"
      :value="form.password3.value"
      :error="form.password3.error"
      :rules="form.password3.rules"
      @value="val => (form.password3.value = val)"
      @error="err => (form.password3.error = err)"
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
      <div v-else class="flex items-center gap-4">Save</div>
    </button>
  </form>
</template>

<style></style>
