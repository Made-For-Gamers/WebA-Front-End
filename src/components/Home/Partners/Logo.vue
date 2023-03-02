<script setup>
  defineProps({
    image: String,
    name: String,
  })
</script>

<template>
  <img :src="image" :alt="`${name} logo`" class="max-h-32 m-auto col-span-1" />
</template>

<style scoped></style>
