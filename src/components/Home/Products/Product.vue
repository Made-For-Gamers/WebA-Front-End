<script setup>
  defineProps({
    title: String,
    description: String,
    image: String,
  })
</script>

<template>
  <div class="bg-white col-span-6 lg:col-span-3 p-2 lg:p-4 rounded-2xl">
    <h3 class="text-4xl font-audiowide">{{ title }}</h3>
    <div class="my-6">
      <img :src="image" :alt="title" class="w-full lg:mx-4 my-2 lg:float-right lg:w-1/2" />
      <p class="text-xl">{{ description }}</p>
    </div>
    <div class="flex justify-end gap-2">
      <button
        type="button"
        :class="`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white
            shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-indigo-700 focus:ring-indigo-500
          bg-indigo-600`"
      >
        <span>CTA 1</span>
      </button>
      <button
        type="button"
        :class="`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white
            shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-indigo-700 focus:ring-indigo-500
          bg-indigo-600`"
      >
        <span>CTA 2</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
