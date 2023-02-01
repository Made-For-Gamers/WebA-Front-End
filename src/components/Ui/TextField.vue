<script setup>
  import { ref } from 'vue'

  const { label, type, rules } = defineProps({
    label: String,
    type: String,
    rules: Array,
  })

  // converts the label to snake-case-1234
  const id = `${label.replace(/\s+/g, '-').toLowerCase()}-${Math.floor(Math.random() * 9999) + 1}`

  const value = ref('')
  const error = ref(false)

  const checkForError = () => {
    error.value = rules.reduce((s, v) => {
      if (s) return s

      const failsRule = v(value.value)
      if (failsRule === true) return false
      else return failsRule
    }, false)
  }
</script>

<template>
  <div>
    <label :for="id" :class="`block text-sm font-medium ${error ? 'text-red-600' : 'text-gray-700'}`">
      {{ label }}
    </label>

    <div class="mt-1">
      <input
        :id="id"
        :name="id"
        :type="type"
        autocomplete="nope"
        v-model="value"
        @input="checkForError"
        :class="`block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm
          focus:outline-none ${error ? 'border-red-600' : 'border-gray-300'}
          ${error ? 'focus:border-red-600' : 'focus:border-indigo-500'}`"
      />

      <span v-if="error" class="text-red-600 text-xs">{{ error }}</span>
    </div>
  </div>
</template>

<style></style>
