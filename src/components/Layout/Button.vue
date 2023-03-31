<script setup>
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  const emit = defineEmits(['click'])

  defineProps({
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    colors: { type: Array, default: [] },
  })
</script>

<template>
  <button
    type="button"
    :disabled="loading"
    :class="`inline-flex items-center justify-center rounded-md border border-transparent p-2 font-normal focus:ring-2
      focus:outline-none focus:ring-offset-2 ${disabled || loading ? '' : colors[0] || 'hover:bg-indigo-500'}
      ${disabled || loading ? 'bg-gray-400' : colors[1] || 'bg-indigo-600'} text-2xl text-white shadow-sm
      ${block ? 'w-full' : ''}
      `"
    @click="() => emit('click', e)"
  >
    <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
    <div v-else class="flex items-center gap-4">
      <slot></slot>
    </div>
    <!-- <slot></slot> -->
  </button>
</template>
