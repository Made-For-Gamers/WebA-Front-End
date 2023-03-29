<script setup>
  import { ref, reactive, defineProps, defineEmits } from 'vue' 
  import { ArrowUpOnSquareIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
  import { useAppManagerStore } from '@/stores/app-manager'
  import { useUserStore } from '@/stores/user'

  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()

  const emit = defineEmits(['toggleLoading', 'updateProfilePic']) 
  const props = defineProps({
    user: Object,
    loading: Boolean,
  })

  const fileInput = ref(null)
  const file = reactive({
    data: null,
    meta: null,
  })

 
  const submit = async b64 => {
  try {
    emit('toggleLoading')

    const res = await userStore.uploadProfilePhoto({ base64: b64 })

    appManagerStore.showAlert({ color: 'success', text: "Profile Picture Updated" })

    userStore.$patch({ user: { ...userStore.$state.user, profile_pic: b64 } }) // Update the userStore

    emit('updateProfilePic', b64)

    clear()
  } catch (err) {
    console.log('err:', err)
    appManagerStore.showAlert({
      color: 'error',
      text:
        err.message ||
        'An unknown error occurred. Please try again later and if the problem persists, contact support.',
    })
  }

  emit('toggleLoading')
}


const dropFile = fileData => {
  if (!fileData.data) {
    const ext = fileData.name.substring(fileData.name.lastIndexOf('.'), fileData.name.length)
    if (['.png', '.jpeg', '.jpg', '.webp'].includes(ext.toLowerCase())) {
      const reader = new FileReader()
      reader.onload = function () {
        const MAX_FILE_SIZE_MB = 5
        if (fileData.size / 1024 / 1024 <= MAX_FILE_SIZE_MB) {
          file.data = reader.result
          file.meta = fileData
          submit(file.data)
        } else {
          appManagerStore.showAlert({
            color: 'warning',
            timeout: 5000,
            text: `Maximum file size exceeded. Max size: ${MAX_FILE_SIZE_MB} MB.`,
          })
        }
      }

      reader.readAsDataURL(fileData)
    } else {
      appManagerStore.showAlert({
        color: 'warning',
        timeout: 5000,
        text: 'File format has to be one of the following: .png, .jpg, .webp',
      })
    }
  } else {
    emit('updateProfilePic', fileData.data)
  }
}


  const picked = e => {
    dropFile(e.target.files[0])
  }

  const explorer = () => {
    if (!file.data) {
      fileInput.value.click()
    }
  }

  const clear = e => {
    file.data = null
    file.meta = null
 
  }
</script>

<template>
  <div class="relative w-32 h-32">
    <input ref="fileInput" type="file" class="hidden" @change="picked" />

    <div
      class="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
      :style="{
        'background-image': `url(${file.data || userStore.$state.user.profile_pic})`,
        'background-color': '#374151',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
      }"
      @dragover.prevent
      @drop="dropFile($event.dataTransfer.files[0])"
    >

      <p v-if="!file.data && !user.profilePic" class="bg-gray-700 text-white flex items-center justify-center text-7xl">
        {{ user.firstName?.substring(0, 1)?.toUpperCase() }}
      </p>
    </div>

    <button
      :class="`rounded-full absolute bottom-0 -left-2 w-10 h-10 shadow-sm flex items-center justify-center text-white
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-indigo-700' : ''}
        ${!loading ? 'bg-indigo-600' : 'bg-gray-400'}`"
      @click="file.data ? clear() : explorer()"
    >
      <ArrowPathIcon v-if="file.data" :style="{ width: '24px', height: '24px' }" />
      <ArrowUpOnSquareIcon v-else :style="{ width: '24px', height: '24px' }" />
    </button>
  </div>
</template>

<style></style>
