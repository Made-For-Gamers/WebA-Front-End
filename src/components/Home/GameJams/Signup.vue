<script setup>
  import { ref, reactive, computed } from 'vue'
  import { ArrowPathIcon, XMarkIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '@/stores/app-manager'
  import { useUserStore } from '@/stores/user'
  import { useGamejamStore } from '@/stores/gamejam'
  import TextField from '@/components/Layout/TextField.vue'

  const props = defineProps({ loading: Boolean })

  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()
  const gamejamStore = useGamejamStore()

  const loading = ref(false)
  const form = reactive({
    name: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter your Name'],
    },
    companyName: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter your Company Name'],
    },
    email: {
      value: '',
      error: true,
      rules: [
        v => !!v || 'Please enter your Email Address',
        v => v?.includes('@') || 'Please enter a valid Email Address',
      ],
    },
  })

  const members = ref([])

  const invalid = computed(() => {
    return (
      Object.keys(form).some(v => form[v].error) ||
      members.value.some(v => {
        return v.name.error || v.email.error
      })
    )
  })

  const addMember = () => {
    members.value.push({
      name: {
        value: '',
        error: true,
        rules: [v => !!v || 'Please enter Member Name'],
      },
      email: {
        value: '',
        error: true,
        rules: [v => !!v || 'Please enter Member Email', v => v?.includes('@') || 'Please enter a valid Email Address'],
      },
    })
  }

  const submit = async () => {
    loading.value = true

    grecaptcha.ready(() => {
      try {
        grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'gamejam_registration' }).then(async token => {
          const res = await gamejamStore.signup({
            name: form.name.value,
            companyName: form.companyName.value,
            email: form.email.value,
            recaptchaToken: token,
            members: members.value.map(v => ({
              name: v.name.value,
              email: v.email.value,
            })),
          })

          if (!res.result) throw new Error(res.message)
          appManagerStore.showAlert({ color: 'success', text: res.message })

          form.name = { ...form.name, value: '', error: false }
          form.companyName = { ...form.companyName, value: '', error: false }
          form.email = { ...form.email, value: '', error: false }

          members.value = []
          loading.value = false
        })
      } catch (err) {
        loading.value = false
        console.log('err B:', err)
        appManagerStore.showAlert({ color: 'error', text: err.message })
      }
    })
  }
</script>

<template>
  <form class="col-span-2 space-y-4">
    <h3 class="text-2xl font-medium text-white">Register to Join</h3>

    <TextField
      type="text"
      label="Name"
      :value="form.name.value"
      :error="form.name.error"
      :rules="form.name.rules"
      @value="val => (form.name.value = val)"
      @error="err => (form.name.error = err)"
      dark
    />

    <TextField
      type="text"
      label="Company Name"
      :value="form.companyName.value"
      :error="form.companyName.error"
      :rules="form.companyName.rules"
      @value="val => (form.companyName.value = val)"
      @error="err => (form.companyName.error = err)"
      dark
    />

    <TextField
      type="email"
      label="Email Address"
      :value="form.email.value"
      :error="form.email.error"
      :rules="form.email.rules"
      @value="val => (form.email.value = val)"
      @error="err => (form.email.error = err)"
      dark
    />

    <div v-for="(member, i) in members" :key="i" class="flex gap-2">
      <TextField
        type="text"
        label="Member Name"
        :value="member.name.value"
        :error="member.name.error"
        :rules="member.name.rules"
        @value="val => (member.name.value = val)"
        @error="err => (member.name.error = err)"
        class="w-full"
        dark
      />

      <TextField
        type="email"
        label="Member Email"
        :value="member.email.value"
        :error="member.email.error"
        :rules="member.email.rules"
        @value="val => (member.email.value = val)"
        @error="err => (member.email.error = err)"
        class="w-full"
        dark
      />

      <button
        type="button"
        :disabled="loading"
        :class="`inline-flex items-center justify-center rounded-md border border-transparent p-2 font-normal mt-6
          focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-[#c71610a0]' : ''} h-full
          ${!loading ? 'bg-[#C71610]' : 'bg-gray-400'} text-2xl text-white shadow-sm`"
        @click="() => members.splice(i, 1)"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
    </div>

    <button
      type="button"
      :disabled="loading"
      :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-indigo-700' : ''} w-full text-2xl
        ${!loading ? 'bg-indigo-600' : 'bg-gray-400'} text-white shadow-sm`"
      @click="addMember"
    >
      Add Member
    </button>

    <button
      type="button"
      :disabled="invalid || loading"
      :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
        focus:outline-none focus:ring-2 focus:ring-offset-2 $${!invalid && !loading ? 'hover:bg-indigo-700' : ''}
        ${!invalid && !loading ? 'bg-indigo-600' : 'bg-gray-400'} w-full text-2xl text-white shadow-sm`"
      @click="submit"
    >
      <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
      <span v-else>Sign Up</span>
    </button>
  </form>
</template>

<style></style>
