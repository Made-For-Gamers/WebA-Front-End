<script setup>
  import { ArrowPathIcon, BookOpenIcon, QuestionMarkCircleIcon, GlobeEuropeAfricaIcon } from '@heroicons/vue/24/outline'
  import { GithubIcon, YoutubeIcon, UnityIcon } from 'vue3-simple-icons'

  const iconLinks = [
    { icon: GithubIcon, text: 'Code' },
    { icon: BookOpenIcon, text: 'Docs' },
    { icon: QuestionMarkCircleIcon, text: 'Website' },
    { icon: GlobeEuropeAfricaIcon, text: 'Examples' },
    { icon: YoutubeIcon, text: 'Tutorials' },
  ]

  const textLinks = [
    { icon: UnityIcon, text: 'How to get started in Unity with Project X' },
    { icon: UnityIcon, text: 'How to get started in Unity with Project Y' },
  ]
</script>

<template>
  <div class="grid grid-cols-3 gap-8 lg:mx-52">
    <section class="col-span-3 bg-gray-300 rounded-lg shadow p-4 flex justify-center gap-4">
      <div
        v-for="link in iconLinks"
        :key="link.text"
        class="bg-white rounded-lg shadow p-4 text-center w-28 cursor-pointer hover:shadow-lg"
      >
        <component :is="link.icon" class="h-12 w-12 m-auto" />
        <p class="mt-2">{{ link.text }}</p>
      </div>
    </section>

    <section class="col-span-2 bg-gray-white rounded-lg shadow p-8">
      <h4 class="text-2xl lg:text-3xl font-audiowide">Title</h4>
      <p class="text-xl mt-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam a nihil ipsa? Itaque fuga et exercitationem rem
        sint pariatur nihil, dignissimos iusto iste quo voluptatibus laborum distinctio sed, ut, ipsam ipsum nobis nam
        earum.
      </p>
    </section>

    <section class="col-span-1 row-span-3 bg-[#262626] rounded-lg shadow p-4">
      <div class="rounded-lg bg-white cursor-pointer shadow hover:shadow-lg p-2 flex gap-2">
        <ArrowPathIcon class="h-12 w-12 text-blue-400 m-auto" />
        <div class="flex-1">
          <h3 class="text-xl">Lorem Ipsum</h3>
          <p>dolor sit amet consectetur</p>
        </div>
      </div>
    </section>

    <section
      v-for="link in textLinks"
      :key="link.text"
      class="col-span-2 bg-gray-white rounded-lg shadow px-8 py-4 bg-white flex items-center gap-2"
    >
      <component :is="link.icon" class="h-10 w-10 m-auto" />
      <p class="flex-1 text-lg">{{ link.text }}</p>
    </section>
  </div>
</template>

<style scoped></style>
