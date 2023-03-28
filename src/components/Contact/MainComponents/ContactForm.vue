<script setup>
  import { ref, reactive, computed } from 'vue'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '@/stores/app-manager'
  import TextField from '@/components/Layout/TextField.vue'
  import TextArea from '@/components/Layout/TextArea.vue'
  import Button from '@/components/Layout/Button.vue'

  const appManagerStore = useAppManagerStore()

  const loading = ref(false)
  const form = reactive({
    fName: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter your First Name'],
    },
    lName: {
      value: '',
      error: false,
      rules: [],
    },
    email: {
      value: '',
      error: true,
      rules: [
        v => !!v || 'Please enter your Email Address',
        v => v?.includes('@') || 'Please enter a valid Email Address',
      ],
    },
    message: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a Message'],
    },
  })

  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const submit = async () => {
    loading.value = true

    grecaptcha.enterprise.ready(() => {
      try {
        grecaptcha.enterprise
          .execute(import.meta.env.VITE_RECAPTCHA_KEY, { action: 'contact_submission' })
          .then(async recaptcha_token => {
            const res = await appManagerStore.submitContactForm(
              Object.keys(form).reduce((s, v) => ({ ...s, [v]: form[v].value }), { recaptcha_token })
            )

            if (!res.result) throw new Error(res.message)
            appManagerStore.showAlert({ color: 'success', text: res.message })

            form.fName = { ...form.fName, value: '', error: true }
            form.lName = { ...form.lName, value: '', error: false }
            form.email = { ...form.email, value: '', error: true }
            form.message = { ...form.message, value: '', error: true }

            loading.value = false
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
  <form class="space-y-4">
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
      :rules="form.lName.rules"
      @value="val => (form.lName.value = val)"
      @error="err => (form.lName.error = err)"
    />

    <TextField
      type="email"
      label="Email Address"
      :value="form.email.value"
      :error="form.email.error"
      :rules="form.email.rules"
      @value="val => (form.email.value = val)"
      @error="err => (form.email.error = err)"
    />

    <TextArea
      label="Message"
      :rows="4"
      :value="form.message.value"
      :error="form.message.error"
      :rules="form.message.rules"
      @value="val => (form.message.value = val)"
      @error="err => (form.message.error = err)"
    />

    <Button @click="submit" :disabled="invalid" :loading="loading" :block="true">Submit</Button>
  </form>
</template>

<style></style>
