<script setup>
  defineProps({
    cover: String,
    title: String,
    date: String,
    description: String,
  })
</script>

<template>
  <div class="col-span-3 relative">
    <img :src="cover" alt="cover" class="absolute -z-10 w-full lg:w-[40%]" />

    <div class="bg-[#ffffffc9] h-[384px] lg:h-auto lg:ml-24 lg:mt-10 shadow-2xl p-4">
      <h3 class="text-4xl">{{ title }}</h3>
      <p class="text-lg italic my-4 text-gray-700">{{ date }}</p>
      <p class="text-xl">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style></style>
