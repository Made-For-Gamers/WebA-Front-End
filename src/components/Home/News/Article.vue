<script setup>
  defineProps({
    id: Number,
    title: String,
    description: String,
    image: String,
  })
</script>

<template>
  <div
    class="relative col-span-6 lg:col-span-2 z-0 hover:scale-105 cursor-pointer transition-all duration-150 rounded-xl overflow-hidden"
  >
    <img :src="image" alt="cover" class="relative w-full" />

    <div class="absolute bg-[#ffffffc9] w-full p-4 z-10 bottom-0 right-0">
      <h3 class="text-4xl font-audiowide">{{ title }}</h3>
    </div>
  </div>
</template>

<style scoped></style>
