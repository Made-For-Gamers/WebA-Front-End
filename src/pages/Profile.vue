<script setup>
  import Profile from '@/components/Profile/Index.vue'
  import ComingSoon from '@/components/Layout/ComingSoon.vue'

  const devMode = import.meta.env.DEV
</script>

<template>
  <Profile v-if="devMode" />
  <ComingSoon v-else />
</template>

<style></style>
