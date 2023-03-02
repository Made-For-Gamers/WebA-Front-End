<script setup>
  import { useProjectStore } from '@/stores/project'
  import Tile from '@/components/Projects/Tile.vue'

  const projectStore = useProjectStore()
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52 my-8">
    <router-link
      type="button"
      :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4
        py-2 font-normal focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-indigo-700
        text-2xl bg-indigo-600 text-white shadow-sm`"
      to="/projects/create"
    >
      Create New Project
    </router-link>

    <div class="grid grid-cols-3 gap-4 mt-4">
      <Tile
        v-for="project in projectStore.projects"
        :key="project.id"
        :id="project.id"
        :title="project.title"
        :type="project.type"
        class=""
      />
    </div>
  </section>
</template>

<style></style>
