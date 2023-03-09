<script setup>
  import { ref } from '@vue/reactivity'

  import Divider from '@/components/Layout/Divider.vue'
  import Metamask from '@/components/Auth/Metamask.vue'
  import Google from '@/components/Auth/Google.vue'
  import EmailPassword from '@/components/Register/EmailPassword.vue'

  const loading = ref(false)
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52 flex flex-col gap-4">
    <!-- <Metamask :loading="loading" @toggleLoading="() => (loading = !loading)" />
    <Google :loading="loading" @toggleLoading="() => (loading = !loading)" />

    <Divider text="OR" classes="my-4" /> -->

    <EmailPassword :loading="loading" @toggleLoading="() => (loading = !loading)" />
  </section>
</template>

<style></style>
