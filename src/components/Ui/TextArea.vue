<script setup>
  import { computed } from '@vue/runtime-core'

  const $emit = defineEmits(['change'])
  const { label, type } = defineProps({
    label: String,
    type: String,
    rows: Number,
  })

  // converts the label to snake-case-1234
  const id = `${label.replace(/\s+/g, '-').toLowerCase()}-${Math.floor(Math.random() * 9999) + 1}`

  const value = false
  // const error = false

  const rules = [v => !!v || `Please enter a ${label}`]

  const error = computed(() => {
    return false
  })
</script>

<template>
  <div>
    <label :for="id" :class="`block text-sm font-medium ${error ? 'text-red-600' : 'text-gray-700'}`">
      {{ label }}
    </label>

    <div class="mt-1">
      <textarea
        :name="id"
        :id="id"
        v-model="value"
        :rows="rows || 4"
        @input="$emit('change', value, error)"
        :class="`block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm
          focus:outline-none ${error ? 'border-red-600' : 'border-gray-300'}
          ${error ? 'focus:border-red-600' : 'focus:border-indigo-500'}`"
      ></textarea>

      <span class="text-red-600 text-xs">{{ error }}</span>
    </div>
  </div>
</template>

<style></style>
