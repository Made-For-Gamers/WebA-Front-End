<script setup>
  import NextJam from './NextJam.vue'
  import Signup from './Signup.vue'
  import cover from '@/assets/images/next-jam.jpg'

  const nextJam = {
    cover,
    title: 'MFG Game Jam',
    date: 'March 24th - April 2nd',
    description:
      'The MFG Game Jam is for Unity game creators that want to take part in a 9 day hackathon to build or complete a web3 enabled game within the NEAR blockchain ecosystem.',
  }
</script>

<template>
  <div class="parallax-bg grid grid-cols-6 gap-4 w-full px-2 py-8 lg:px-24 lg:py-24">
    <div class="col-span-6 lg:col-span-4 lg:col-start-2 mb-16 lg:mb-32 text-white">
      <h2 class="text-5xl lg:text-6xl font-medium text-center font-space-ranger" data-aos="fade-left">Game Jams</h2>
      <h4 class="text-2xl mt-6 lg:text-3xl lg:mt-8 text-center font-audiowide" data-aos="fade-right">
        From time to time, we organize virtual game jams, also known as game creation hackathons, to coincide with the
        introduction of new integration layers or partner ecosystems in our universe.
      </h4>
    </div>

    <div class="col-span-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
      <NextJam
        :cover="nextJam.cover"
        :title="nextJam.title"
        :date="nextJam.date"
        :description="nextJam.description"
        data-aos="fade-left"
      />
      <Signup data-aos="fade-right" />
    </div>

    <!-- <a href="#" @click.prevent="() => false" class="text-xl mt-8 lg:mt-16 w-max text-white">View Past Jams</a> -->
  </div>
</template>

<style scoped>
  .parallax-bg {
    background-image: url('@/assets/images/bg-orbie.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>
