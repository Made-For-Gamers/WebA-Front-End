<script setup>
  import { ref, shallowRef, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import _ from 'lodash'

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
  <section v-if="project" :class="`cover-art rounded-lg shadow p-6 lg:mx-52 my-8 relative before:content-['']`">
    <div class="relative z-20">
      <h2 class="text-6xl lg:text-6xl font-medium font-space-ranger text-white">{{ project?.name }}</h2>
      <h4 class="text-2xl mt-6 lg:text-3xl lg:mt-16 font-audiowide text-white">{{ project?.project_types }}</h4>
    </div>
  </section>

  <component :is="component" :project="project" />
</template>

<style scoped>
  .cover-art {
    background-image: linear-gradient(to bottom right, #000, #3c0a30);
  }
</style>
