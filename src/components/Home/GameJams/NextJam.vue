<script setup>
  defineProps({
    cover: String,
    title: String,
    date: String,
    description: String,
  })
</script>

<template>
  <div class="lg:col-span-3 relative z-0">
    <img :src="cover" alt="cover" class="absolute w-full lg:w-[50%] lg:max-w-sm rounded-xl" />

    <div class="relative bg-[#ffffffc9] h-[384px] lg:h-auto lg:ml-24 lg:mt-20 shadow-2xl p-4 z-10 rounded-xl">
      <h3 class="text-4xl font-audiowide">{{ title }}</h3>
      <p class="text-lg italic my-4 text-gray-700">{{ date }}</p>
      <p class="text-xl">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style></style>
