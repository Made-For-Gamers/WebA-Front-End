<script setup>
  defineProps({
    href: String,
    icon: Object,
    fill: String,
    size: {
      type: String,
      default: '24px',
    },
  })
</script>

<template>
  <a target="_blank" class="block" :href="href">
    <component :is="icon" :style="{ fill, width: size, height: size }" />
  </a>
</template>

<style scoped>
  svg {
    margin: auto;
  }
</style>
