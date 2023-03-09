<script setup>
  import { ref } from 'vue'

  defineProps({
    id: Number,
    title: String,
    description: String,
    image: String,
    lgColSpan: String,
  })

  const readMore = ref(false)
</script>

<template>
  <div
    :style="{ 'background-image': `url(${image})` }"
    :class="`col-span-6 ${lgColSpan} relative z-0 rounded-xl overflow-hidden flex items-end bg-cover bg-no-repeat h-min`"
  >
    <div class="bg-[#ffffff8b] shadow-2xl p-4 z-10 mt-32 w-full">
      <h3 class="text-4xl font-audiowide">{{ title }}</h3>

      <a
        href="#"
        @click.prevent="() => (readMore = !readMore)"
        class="text-blue-500 hover:text-blue-700 hover:underline inline-block mt-4"
      >
        READ {{ readMore ? 'LESS' : 'MORE' }}
      </a>

      <div
        :style="{
          opacity: readMore ? 1 : 0,
          height: readMore ? 'auto' : 0,
        }"
        class="transition-all duration-500 overflow-hidden"
      >
        <p class="text-xl mt-4">{{ description }}</p>
        <!-- <div class="text-right mt-4">
          <router-link :to="`products/${id}`" class="text-blue-500 hover:text-blue-700 hover:underline">
            READ MORE
          </router-link>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
