<script setup>
  const props = defineProps({
    id: Number,
    title: String,
    type: Object,
  })
</script>

<template>
  <router-link class="rounded-lg bg-white hover:bg-[#cfcfcf] shadow hover:shadow-md p-4 block" :to="`projects/${id}`">
    <h3 class="text-4xl">{{ title }}</h3>
    <p class="text-xl">{{ type.text }}</p>
  </router-link>
</template>

<style scoped></style>
