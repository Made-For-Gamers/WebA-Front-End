<script setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    text: String,
    classes: String,
  })
</script>

<template>
  <div class="w-full h-[1px] bg-slate-400 flex items-center justify-center" :class="classes">
    <span class="bg-white text-slate-400 px-2">{{ text }}</span>
  </div>
</template>

<style scoped></style>
