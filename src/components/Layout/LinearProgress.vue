<script setup>
  import { useAppManagerStore } from '@/stores/app-manager'

  const appManagerStore = useAppManagerStore()
</script>

<template>
  <div v-if="appManagerStore.loading" class="bg-white relative overflow-hidden h-1">
    <div class="progress-bar absolute bottom-0 top-0 w-1/2 bg-indigo-600"></div>
  </div>
</template>

<style>
  .progress-bar {
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-name: linear-progress;
  }

  @keyframes linear-progress {
    from {
      left: -50%;
    }

    to {
      left: 100%;
    }
  }
</style>
