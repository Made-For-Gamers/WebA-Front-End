<script setup>
  import { ref, shallowRef, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import _ from 'lodash'
  import { PencilSquareIcon } from '@heroicons/vue/24/outline'

  import router from '@/router'
  import { useAppManagerStore } from '@/stores/app-manager'
  import { useProjectStore } from '@/stores/project'
  import Game from '@/components/Projects/Project/Game.vue'
  import Provider from '@/components/Projects/Project/Provider.vue'

  const { currentRoute } = useRouter()
  const appManagerStore = useAppManagerStore()
  const projectStore = useProjectStore()

  const project = ref(null)
  const component = shallowRef(null)

  onMounted(async () => {
    if (!projectStore.projects.length) {
      appManagerStore.loading = true
      await projectStore.fetchProjects()
      appManagerStore.loading = false
    }

    project.value = projectStore.projects.find(v => v.id === parseInt(currentRoute.value.params.id))
    if (!project.value) {
      appManagerStore.showAlert({
        color: 'warning',
        text: `Project with id ${currentRoute.value.params.id} not found.`,
      })
      router.push('/projects')
    }

    component.value = project.value?.project_types === 'Game or Metaverse' ? Game : Provider
  })
</script>

<template>
  <section v-if="project" class="flex justify-between rounded-lg bg-white shadow p-6 lg:mx-16">
    <div>
      <h2 class="text-6xl lg:text-6xl font-medium font-space-ranger">{{ project?.name }}</h2>
      <h4 class="text-2xl mt-6 lg:text-3xl lg:mt-16 font-audiowide">{{ project?.project_types }}</h4>
    </div>
    <div class="flex items-end">
      <router-link
        :to="`/projects/edit/${project.id}`"
        :class="`inline-flex items-center justify-center rounded-full border border-transparent p-3 font-normal focus:outline-none
          focus:ring-2 focus:ring-offset-2 hover:bg-indigo-700 text-2xl bg-indigo-600 text-white shadow-sm w-12 h-12`"
      >
        <PencilSquareIcon class="w-full h-full" />
      </router-link>
    </div>
  </section>

  <component :is="component" :project="project" />
</template>

<style scoped>
  /* .cover-art {
    background-image: linear-gradient(to bottom right, #000, #3c0a30);
  } */
</style>
