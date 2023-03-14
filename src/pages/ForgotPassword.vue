<script setup>
  import ForgotPassword from '@/components/ForgotPassword/Index.vue'
  import ComingSoon from '@/components/Layout/ComingSoon.vue'

  const devMode = import.meta.env.DEV
</script>

<template>
  <ForgotPassword v-if="devMode" />
  <ComingSoon v-else />
</template>

<style></style>
