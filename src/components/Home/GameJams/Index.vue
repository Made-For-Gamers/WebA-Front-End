<script setup>
  import NextJam from './NextJam.vue'
  import Signup from './Signup.vue'

  const nextJam = {
    cover:
      'data:image/png;base64,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',
    title: 'Next Jam Title',
    date: new Date().toLocaleDateString('EN-ZA'),
    description:
      'Jam Description - Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, quas. Nam in earum nemo, culpa mollitia tempore laborum explicabo. Excepturi, culpa tenetur? Iure voluptatum dicta labore, error nesciunt?',
  }
</script>

<template>
  <div class="grid grid-cols-6 gap-4 w-full px-2 py-8 lg:px-24 lg:py-24">
    <div class="col-span-6 lg:col-span-4 lg:col-start-2 mb-16 lg:mb-32">
      <h2 class="text-6xl lg:text-6xl font-medium text-center">Game Jams</h2>
      <h4 class="text-2xl mt-6 lg:text-3xl lg:mt-8 text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </h4>
    </div>

    <div class="col-span-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
      <NextJam :cover="nextJam.cover" :title="nextJam.title" :date="nextJam.date" :description="nextJam.description" />
      <Signup />
    </div>

    <a href="#" @click.prevent="false" class="text-xl mt-8 lg:mt-16 w-max">View Past Jams</a>
  </div>
</template>

<style scoped></style>
