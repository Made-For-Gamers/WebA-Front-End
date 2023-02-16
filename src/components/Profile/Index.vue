<script setup>
  import { ref } from 'vue'
  import ProfilePhoto from './ProfilePhoto.vue'
  import PersonalDeets from './PersonalDeets.vue'
  import ResetEmail from './ResetEmail.vue'
  import ChangePassword from './ChangePassword.vue'
  import DeleteAccount from './DeleteAccount.vue'
  import { useUserStore } from '../../stores/user'

  const userStore = useUserStore()
  const loading = ref(false)
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <div class="flex gap-8 flex-col lg:flex-row-reverse lg:justify-between lg:items-center">
      <ProfilePhoto :user="userStore.$state" :loading="loading" @toggleLoading="loading = !loading" />
      <PersonalDeets :user="userStore.$state" :loading="loading" @toggleLoading="loading = !loading" class="grow" />
    </div>
  </section>

  <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <ResetEmail :user="userStore.$state" :loading="loading" @toggleLoading="loading = !loading" class="grow" />
  </section>

  <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <ChangePassword :user="userStore.$state" :loading="loading" @toggleLoading="loading = !loading" class="grow" />
  </section>

  <!-- TODO: we'll have to detect what auth providers already exist to know which others to show -->
  <!-- <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <p>link auth providers</p>
  </section> -->

  <!-- <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <p>delete / deactivate account</p>
  </section> -->
</template>

<style></style>
