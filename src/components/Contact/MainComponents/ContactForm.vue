<script>
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'
  import TextField from '../../Ui/TextField.vue'
  import TextArea from '../../Ui/TextArea.vue'

  export default {
    components: { ArrowPathIcon, TextField, TextArea },

    data: () => ({
      loading: false,
      form: {
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
      },
    }),

    computed: {
      valid() {
        return Object.keys(this.form).some(v => !this.form[v].error)
      },
    },

    methods: {
      checkForError(field) {
        if (!field) return

        this.form[field].error = this.form[field].rules.reduce((s, v) => {
          if (s) return s

          const failsRule = v(this.form[field].value)
          if (failsRule === true) return false
          else return failsRule
        }, false)
      },

      setValue(field, val) {
        console.log('setting:', field, val)
        this.form[field].value = val
      },
    },
  }
</script>

<template>
  <form class="space-y-4">
    <text-field
      type="text"
      label="First Name"
      :value="form.fName.value"
      :error="form.fName.error"
      :rules="form.fName.rules"
      @value="val => (form.fName.value = val)"
      @error="err => (form.fName.error = err)"
    />

    <text-field
      type="text"
      label="Last Name"
      :value="form.lName.value"
      :error="form.lName.error"
      :rules="form.lName.rules"
      @value="val => (form.lName.value = val)"
      @error="err => (form.lName.error = err)"
    />

    <text-field
      type="email"
      label="Email Address"
      :value="form.email.value"
      :error="form.email.error"
      :rules="form.email.rules"
      @value="val => (form.email.value = val)"
      @error="err => (form.email.error = err)"
    />

    <text-area
      label="Message"
      :rows="4"
      :value="form.message.value"
      :error="form.message.error"
      :rules="form.message.rules"
      @value="val => (form.message.value = val)"
      @error="err => (form.message.error = err)"
    />

    <button
      type="button"
      :disabled="!valid || loading"
      :class="`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white
        shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ${valid && !loading ? 'hover:bg-indigo-700' : ''}
        ${valid && !loading ? 'focus:ring-indigo-500' : ''} ${valid && !loading ? 'bg-indigo-600' : 'bg-gray-400'}`"
      @click="submit"
    >
      <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
      <span v-else>Submit</span>
    </button>
  </form>
</template>

<style></style>
