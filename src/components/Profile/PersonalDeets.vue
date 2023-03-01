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
    fName: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter your First Name'],
    },
    lName: {
      value: '',
      error: false,
    },
  })

  onMounted(() => {
    form.fName = { ...form.fName, value: props.user.firstName, error: true }
    form.lName = { ...form.lName, value: props.user.lastName, error: false }
  })

  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const submit = async () => {
    try {
      emit('toggleLoading')

      const res = await userStore.updateProfile({
        firstName: form.fName.value,
        lastName: form.lName.value,
      })

      form.fName = { ...form.fName, error: true }

      // TODO: replace this with an actual message from the server
      appManagerStore.showAlert({ color: 'success', text: 'Details successfully updated' })
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({ color: 'error', text: err.message })
    }

    emit('toggleLoading')
  }
</script>

<template>
  <form class="space-y-4">
    <h3 class="text-2xl font-medium">Personal Details</h3>

    <TextField
      type="text"
      label="First Name"
      :value="form.fName.value"
      :error="form.fName.error"
      :rules="form.fName.rules"
      @value="val => (form.fName.value = val)"
      @error="err => (form.fName.error = err)"
    />

    <TextField
      type="text"
      label="Last Name"
      :value="form.lName.value"
      :error="form.lName.error"
      @value="val => (form.lName.value = val)"
      @error="err => (form.lName.error = err)"
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
