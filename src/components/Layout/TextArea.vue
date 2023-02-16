<script setup>
  import { defineProps, defineEmits, computed } from 'vue'

  const emit = defineEmits(['value', 'error'])
  const props = defineProps({
    label: String,
    rows: Number,
    value: String,
    error: Boolean | String,
    rules: Array,
  })

  const id = computed(() => `${props.label.replace(/\s+/g, '-').toLowerCase()}-${Math.floor(Math.random() * 9999) + 1}`)

  const handleInput = e => {
    emit('value', e.target.value)
    emit(
      'error',
      props?.rules?.reduce((s, v) => {
        if (s) return s

        const failsRule = v(e.target.value)
        if (failsRule === true) return false
        else return failsRule
      }, false)
    )
  }
</script>

<template>
  <label
    :for="id"
    :class="`block text-sm font-medium
      ${!error || error === true ? 'text-gray-700' : 'text-red-600'}`"
  >
    {{ label }}
  </label>

  <div class="mt-1">
    <textarea
      :id="id"
      :name="id"
      autocomplete="nope"
      :rows="rows || 10"
      :value="value"
      @input="handleInput"
      :class="`block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm
        focus:outline-none ${!error || error === true ? 'border-gray-300' : 'border-red-600'}
        ${error ? 'focus:border-red-600' : 'focus:border-indigo-500'}`"
    />

    <span v-if="error" class="text-red-600 text-xs">
      {{ error === true ? '' : error }}
    </span>
  </div>
</template>

<style></style>
