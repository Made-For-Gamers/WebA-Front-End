<script setup>
  const props = defineProps({
    href: String,
    icon: Object,
    fill: String,
  })
</script>

<template>
  <a target="_blank" class="social-icon" :href="href">
    <component :is="icon" :style="{ fill }" />
  </a>
</template>

<style scoped>
  svg {
    margin: auto;
  }
</style>
