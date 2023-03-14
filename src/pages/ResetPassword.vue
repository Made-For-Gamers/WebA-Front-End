<script setup>
  import ResetPassword from '@/components/ResetPassword/Index.vue'
  import ComingSoon from '@/components/Layout/ComingSoon.vue'

  const devMode = import.meta.env.DEV
</script>

<template>
  <ResetPassword v-if="devMode" />
  <ComingSoon v-else />
</template>

<style></style>
