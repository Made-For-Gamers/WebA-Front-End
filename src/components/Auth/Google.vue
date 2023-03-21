<script setup>
  import { onMounted } from 'vue'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'
  import { GoogleIcon } from 'vue3-simple-icons'

  import router from '@/router'
  import { useUserStore } from '@/stores/user'
  import { useAppManagerStore } from '@/stores/app-manager'

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

  <button
    type="button"
    :disabled="loading"
    :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-[#357bf0]' : ''} text-2xl text-white
        ${!loading ? 'bg-[#4285F4]' : 'bg-gray-400'}`"
    @click="googleLogin"
  >
    <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
    <div v-else class="flex items-center gap-4">
      <GoogleIcon style="fill: #fff" />
      <span>Google</span>
    </div>
  </button>
</template>

<style scoped>
  #my-signin2 {
    display: none;
  }
</style>
