<script setup>
  const props = defineProps({
    text: String,
    color: String,
    textBg: String,
  })
</script>

<template>
  <div :class="`w-full h-[1px] ${color || 'bg-slate-400'} flex items-center justify-center`">
    <span :class="`${textBg || 'bg-white'} ${color || 'text-slate-400'} px-2`">{{ text }}</span>
  </div>
</template>

<style scoped></style>
