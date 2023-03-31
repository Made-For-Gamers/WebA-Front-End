<script setup>
  import Signin from '@/components/Signin/Index.vue'
  import ComingSoon from '@/components/Layout/ComingSoon.vue'

  const devMode = import.meta.env.DEV
</script>

<template>
  <Signin />
  <!-- <Signin v-if="devMode" /> -->
  <!-- <ComingSoon v-else /> -->
</template>

<style></style>
