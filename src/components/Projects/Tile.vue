<script setup>
  const props = defineProps({
    id: Number,
    name: String,
    type: String,
  })
</script>

<template>
  <router-link class="mb-4" :to="`projects/${id}`">
    <h3 class="text-4xl">{{ name }}</h3>
    <p class="text-xl">{{ type }}</p>
  </router-link>
</template>

<style scoped></style>
