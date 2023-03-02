<script setup>
  import { useRouter } from 'vue-router'

  import router from '@/router'
  import { useAppManagerStore } from '@/stores/app-manager'
  import { useProjectStore } from '@/stores/project'
  import Feature from '@/components/Projects/Project/Feature.vue'
  import Game from '@/components/Projects/Project/Game.vue'

  const { currentRoute } = useRouter()
  const appManagerStore = useAppManagerStore()
  const projectStore = useProjectStore()

  const project = projectStore.projects.find(v => v.id === parseInt(currentRoute.value.params.id))
  if (!project) {
    appManagerStore.showAlert({ color: 'error', text: `Project with id ${currentRoute.value.params.id} not found.` })
    router.push('/projects')
  }
</script>

<template>
  <section
    :class="`cover-art rounded-lg shadow p-6 lg:mx-52 my-8 relative before:content-[''] before:bg-[#000000dc] before:absolute
      before:top-0 before:left-0 before:w-full before:h-full before:z-10 before:rounded-lg`"
  >
    <div class="relative z-20">
      <h2 class="text-6xl lg:text-6xl font-medium font-space-ranger text-white">{{ project?.title }}</h2>
      <h4 class="text-2xl mt-6 lg:text-3xl lg:mt-16 font-audiowide text-white">{{ project?.type.text }}</h4>
    </div>
  </section>

  <component :is="{ Game, Feature }[project?.type.text]" />
</template>

<style scoped>
  .cover-art {
    background-image: url('@/assets/images/project-banner.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
