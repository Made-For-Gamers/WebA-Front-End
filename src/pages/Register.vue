<script setup>
  import Register from '@/components/Register/Index.vue'
  import ComingSoon from '@/components/Layout/ComingSoon.vue'

  const devMode = import.meta.env.DEV
</script>

<template>
  <Register v-if="devMode" />
  <ComingSoon v-else />
</template>

<style></style>
