<script setup>
  import { computed } from 'vue'

  const emit = defineEmits(['value', 'error'])
  const props = defineProps({
    label: String,
    placeholder: Boolean,
    rows: Number,
    value: String,
    error: Boolean | String,
    rules: Array,
    dark: Boolean,
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

  let labelColor = 'text-red-600'
  if (!props.error || props.error === true) labelColor = props.dark ? 'text-white' : 'text-gray-700'
</script>

<template>
  <div class="w-full">
    <label v-if="!placeholder" :for="id" :class="`block text-sm font-medium ${labelColor}`">
      {{ label }}
    </label>

    <div class="mt-1">
      <textarea
        :id="id"
        :name="id"
        :placeholder="placeholder ? label : ''"
        :rows="rows || 10"
        :value="value"
        :class="`block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm
        focus:outline-none ${!error || error === true ? 'border-gray-300' : 'border-red-600'}
        ${error ? 'focus:border-red-600' : 'focus:border-indigo-500'}`"
        autocomplete="nope"
        @input="handleInput"
      />

      <span v-if="error" class="text-red-600 text-xs">
        {{ error === true ? '' : error }}
      </span>
    </div>
  </div>
</template>

<style></style>
