<script setup>
  import { ref } from 'vue'
  import { ArrowUpRightIcon, BanknotesIcon, BeakerIcon, BoltIcon, BugAntIcon } from '@heroicons/vue/24/outline'

  import TextField from '@/components/Layout/TextField.vue'

  const features = [
    { id: 1, icon: ArrowUpRightIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 2, icon: BanknotesIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 3, icon: BeakerIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 4, icon: BoltIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 5, icon: BugAntIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 6, icon: ArrowUpRightIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 7, icon: BanknotesIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 8, icon: BeakerIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 9, icon: BoltIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 10, icon: BugAntIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 11, icon: ArrowUpRightIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 12, icon: BanknotesIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 13, icon: BeakerIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 14, icon: ArrowUpRightIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 15, icon: BanknotesIcon, title: 'Feature Title', description: 'Short description goes here' },
    { id: 18, icon: BugAntIcon, title: 'Feature Title', description: 'Short description goes here' },
  ]

  const addedFeatures = ref([])
</script>

<template>
  <div class="grid grid-cols-4 gap-4 lg:mx-52">
    <section class="col-span-1 row-span-2 bg-gray-white rounded-lg shadow p-4">
      <h4 class="text-2xl lg:text-3xl font-audiowide">Categories</h4>
      <ul class="text-xl mt-4">
        <li class="cursor-pointer hover:underline">All Categories</li>
        <li class="cursor-pointer underline">Category 1</li>
        <li class="cursor-pointer hover:underline">Category 2</li>
        <li class="cursor-pointer hover:underline">Category 3</li>
      </ul>
    </section>

    <section v-if="addedFeatures.length > 0" class="col-span-3 bg-gray-white rounded-lg shadow p-4">
      <h4 class="text-2xl lg:text-3xl font-audiowide mb-4">Features</h4>

      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="feature in addedFeatures"
          :key="feature.id"
          class="col-span-1 rounded-lg bg-white cursor-pointer shadow hover:shadow-lg p-2 flex gap-2"
        >
          <component :is="feature.icon" class="h-8 w-8 m-auto" />
          <div class="flex-1">
            <h3 class="text-xl">{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="col-span-3 bg-gray-white rounded-lg shadow p-4">
      <div class="flex justify-between items-center mb-4">
        <h4 class="text-2xl lg:text-3xl font-audiowide">Add Feature</h4>

        <TextField
          type="text"
          label="Search"
          placeholder
          :value="''"
          :error="''"
          :rules="[]"
          @value="val => {}"
          @error="err => {}"
        />
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="col-span-1 rounded-lg bg-white cursor-pointer shadow hover:shadow-lg p-2 flex gap-2"
          @click="() => addedFeatures.push(feature)"
        >
          <component :is="feature.icon" class="h-8 w-8 m-auto" />
          <div class="flex-1">
            <h3 class="text-xl">{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
