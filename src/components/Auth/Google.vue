<script setup>
  import { onMounted } from 'vue'
  import { GoogleIcon } from 'vue3-simple-icons'

  import router from '@/router'
  import { useUserStore } from '@/stores/user'
  import { useAppManagerStore } from '@/stores/app-manager'
  import Button from '@/components/Layout/Button.vue'

  const props = defineProps({ loading: Boolean })
  const emit = defineEmits(['toggleLoading'])

  const userStore = useUserStore()
  const appManagerStore = useAppManagerStore()

  const googleLogin = () => {
    document.querySelector('#my-signin2 > div').click()
  }

  const onsuccess = async res => {
    try {
      emit('toggleLoading')
      // const profile = res.getBasicProfile()
      await userStore.exchangeGoogleTokenForJwt({ token: res.getAuthResponse().id_token })
      appManagerStore.showAlert({ color: 'success', text: "You've successfully been logged in" })
      router.push('/projects')
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({ color: 'danger', vertical: false, text: err })
    }
    emit('toggleLoading')
  }

  const onfailure = err => {
    console.log('err:', err)
    appManagerStore.showAlert({ color: 'error', vertical: false, text: err?.error || err })
  }

  onMounted(() => {
    gapi.signin2.render('my-signin2', { onsuccess, onfailure })
  })
</script>

<template>
  <div id="my-signin2"></div>

  <Button @click="googleLogin" :colors="['hover:bg-[#357bf0]', 'bg-[#4285F4]']" :loading="loading">
    <GoogleIcon style="fill: #fff" />
    <span>Google</span>
  </Button>
</template>

<style scoped>
  #my-signin2 {
    display: none;
  }
</style>
