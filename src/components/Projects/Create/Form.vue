<script setup>
  import { ref, reactive, computed } from 'vue'
  import { ArrowPathIcon, XMarkIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '@/stores/app-manager'
  import { useUserStore } from '@/stores/user'
  import { useGamejamStore } from '@/stores/gamejam'

  import TextField from '@/components/Layout/TextField.vue'
  import Select from '@/components/Layout/Select.vue'

  const props = defineProps({ loading: Boolean })

  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()
  const gamejamStore = useGamejamStore()

  const loading = ref(false)
  const form = reactive({
    name: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a Project Name'],
    },
    type: {
      value: null,
      error: true,
      rules: [v => !!v || 'Please enter a Project Type'],
    },
  })

  const invalid = computed(() => {
    return Object.keys(form).some(v => form[v].error)
  })

  const submit = async () => {
    loading.value = true

    // try {
    //   const res = await gamejamStore.signup({
    //     name: form.name.value,
    //     companyName: form.companyName.value,
    //     email: form.email.value,
    //     recaptchaToken: token,
    //     members: members.value.map(v => ({
    //       name: v.name.value,
    //       email: v.email.value,
    //     })),
    //   })

    //   if (!res.result) throw new Error(res.message)
    //   appManagerStore.showAlert({ color: 'success', text: res.message })

    //   form.name = { ...form.name, value: '', error: false }
    //   form.companyName = { ...form.companyName, value: '', error: false }
    //   form.email = { ...form.email, value: '', error: false }

    //   members.value = []
    //   loading.value = false
    // } catch (err) {
    //   console.log('err B:', err)
    //   appManagerStore.showAlert({ color: 'error', text: err.message })
    // }

    loading.value = false
  }
</script>

<template>
  <form class="col-span-2 space-y-4">
    <h3 class="text-2xl font-medium">Create New Project</h3>

    <TextField
      type="text"
      label="Project Name"
      :value="form.name.value"
      :error="form.name.error"
      :rules="form.name.rules"
      @value="val => (form.name.value = val)"
      @error="err => (form.name.error = err)"
    />

    <Select
      label="Project Type"
      :items="[
        { text: 1, value: 'Game' },
        { text: 2, value: 'Feature' },
      ]"
      :value="form.type.value"
      :error="form.type.error"
      :rules="form.type.rules"
      @value="val => (form.type.value = val)"
      @error="err => (form.type.error = err)"
    />

    <button
      type="button"
      :disabled="loading"
      :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-indigo-700' : ''} w-full text-2xl
        ${!loading ? 'bg-indigo-600' : 'bg-gray-400'} text-white shadow-sm`"
      @click="addMember"
    >
      Create
    </button>
  </form>
</template>

<style></style>
