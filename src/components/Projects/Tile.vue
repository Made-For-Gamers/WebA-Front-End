<script setup>
  const props = defineProps({
    id: Number,
    name: String,
    type: String,
  })
</script>

<template>
  <router-link
    class="flex flex-col gap-8 justify-between mb-4 bg-[#576d8d] text-white rounded px-4 py-3"
    :to="`projects/${id}`"
  >
    <h3 class="text-4xl">{{ name }}</h3>
    <p class="text-xl">{{ type }}</p>
  </router-link>
</template>

<style scoped></style>
