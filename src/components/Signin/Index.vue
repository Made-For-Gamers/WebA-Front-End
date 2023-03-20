<script setup>
  import { ref } from '@vue/reactivity'

  import Divider from '@/components/Layout/Divider.vue'
  import Metamask from '../Auth/Metamask.vue'
  import NearWallet from '../Auth/NearWallet.vue'
  // import Google from '../Auth/Google.vue'
  import EmailPassword from './EmailPassword.vue'

  const loading = ref(false)
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52 flex flex-col gap-4">
    <Metamask :loading="loading" @toggleLoading="() => (loading = !loading)" />
    <NearWallet :loading="loading" @toggleLoading="() => (loading = !loading)" />
    <!-- <Google :loading="loading" @toggleLoading="() => loading = !loading" />-->

    <Divider text="OR" classes="my-4" />

    <EmailPassword :loading="loading" @toggleLoading="() => (loading = !loading)" />

    <div class="text-center">
      <router-link to="forgot-password" class="text-[#3366CC] hover:text-[#5b80ca] hover:underline">
        Forgot Password
      </router-link>
    </div>
  </section>
</template>

<style></style>
