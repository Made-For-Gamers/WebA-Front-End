<script setup>
  import { ref, onMounted } from 'vue'

  import { useProjectStore } from '@/stores/project'
  import { useProviderFeatureStore } from '@/stores/providerFeature'
  import { useAppManagerStore } from '@/stores/app-manager'

  import Tile from '@/components/Projects/Tile.vue'
  import TextField from '@/components/Layout/TextField.vue'

  const projectStore = useProjectStore()
  const providerFeatureStore = useProviderFeatureStore()
  const appManagerStore = useAppManagerStore()

  const isProjectLoading = ref(false)

  onMounted(async () => {
    if (!projectStore.projects?.length) isProjectLoading.value = true
    await projectStore.fetchProjects()
    providerFeatureStore.fetchCategories()
    isProjectLoading.value = false
  })
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-16">
    <div class="flex justify-between items-center">
      <h5 class="text-slate-500 uppercase text-xl">Your Projects</h5>
      <TextField type="text" label="Filter" :placeholder="true" class="w-max" />
    </div>

    <div class="grid grid-cols-3 gap-4 mt-4">
      <Tile
        v-for="project in projectStore.projects"
        :key="project.id"
        :id="project.id"
        :name="project.name"
        :type="project.project_types"
      />
    </div>

    <div class="flex items-center justify-between">
      <p v-if="isProjectLoading">Loading projects...</p>
      <p v-else-if="!projectStore.projects?.length">You have no projects yet! To get started, create a project -></p>

      <div class="text-right">
        <router-link
          type="button"
          :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4
        py-2 font-normal focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-indigo-700
        text-2xl bg-indigo-600 text-white shadow-sm`"
          to="/projects/create"
        >
          Create New Project
        </router-link>
      </div>
    </div>
  </section>
</template>

<style></style>
