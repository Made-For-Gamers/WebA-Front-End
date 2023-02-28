<script setup>
  defineProps({
    id: Number,
    title: String,
    description: String,
    image: String,
  })
</script>

<template>
  <div class="col-span-6 lg:col-span-3 relative z-0">
    <img :src="image" alt="cover" class="relative w-full" />

    <div class="absolute bg-[#ffffffc9] shadow-2xl p-4 z-10 bottom-0 right-0">
      <h3 class="text-4xl font-audiowide">{{ title }}</h3>
      <p class="text-xl mt-8 mb-4">{{ description }}</p>
      <div class="text-right">
        <router-link :to="`products/${id}`" class="text-blue-500 hover:text-blue-700 hover:underline">
          READ MORE
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
