<script setup>
  import { ref } from 'vue'

  import ProfilePhoto from '@/components/Profile/ProfilePhoto.vue'
  import PersonalDetails from '@/components/Profile/PersonalDetails.vue'
  import ResetEmail from '@/components/Profile/ResetEmail.vue'
  import ChangePassword from '@/components/Profile/ChangePassword.vue'
  import Button from '@/components/Layout/Button.vue'

  import { useUserStore } from '@/stores/user'
  import { useAppManagerStore } from '@/stores/app-manager'

  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()
  const loading = ref(false)

  const triggerPasswordReset = async () => {
    loading.value = true

    try {
      const res = await userStore.triggerForgotPassword({ email: userStore?.user?.email })
      if (!res.result) throw new Error(res.message)
      appManagerStore.showAlert({ color: 'success', text: res.message })
    } catch (err) {
      loading.value = false
      console.log('err B:', err)
      appManagerStore.showAlert({
        color: 'error',
        text:
          err.message ||
          'An unknown error occurred. Please try again later and if the problem persists, contact support.',
      })
    }

    loading.value = false
  }
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <div class="flex gap-8 flex-col lg:flex-row-reverse lg:justify-between lg:items-center">
      <ProfilePhoto :user="userStore.$state" :loading="loading" @toggleLoading="() => (loading = !loading)" />
      <PersonalDetails
        :user="userStore.$state"
        :loading="loading"
        @toggleLoading="() => (loading = !loading)"
        class="grow"
      />
    </div>
  </section>

  <section
    v-if="!userStore?.user?.wallet_addr"
    class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4"
  >
    <ResetEmail :user="userStore.$state" :loading="loading" @toggleLoading="() => (loading = !loading)" class="grow" />
  </section>

  <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <!-- <Button @click="triggerPasswordReset" :colors="['hover:bg-[#357bf0]', 'bg-[#4285F4]']" :loading="loading">
      <GoogleIcon style="fill: #fff" />
      <span>Google</span>
    </Button> -->

    <Button @click="triggerPasswordReset" :disabled="loading" :loading="loading">Reset Password</Button>
  </section>
  <!-- <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <ChangePassword
      :user="userStore.$state"
      :loading="loading"
      @toggleLoading="() => (loading = !loading)"
      class="grow"
    />
  </section> -->

  <!-- TODO: we'll have to detect what auth providers already exist to know which others to show -->
  <!-- <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <p>link auth providers</p>
  </section> -->

  <!-- <section class="rounded-lg bg-white shadow p-6 mb-6 lg:mx-52 flex flex-col gap-4">
    <p>delete / deactivate account</p>
  </section> -->
</template>

<style></style>
