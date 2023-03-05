<script setup>
  defineProps({
    id: Number,
    title: String,
    description: String,
    image: String,
    lgColSpan: String,
  })
</script>

<template>
  <div
    :style="{ 'background-image': `url(${image})` }"
    :class="`col-span-6 ${lgColSpan} relative z-0 rounded-xl overflow-hidden flex items-end bg-cover bg-no-repeat`"
  >
    <div class="bg-[#ffffff8b] shadow-2xl p-4 z-10 mt-32">
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
