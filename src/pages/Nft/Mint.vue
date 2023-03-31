<script setup>
  import { ref, reactive, computed } from 'vue'
  import { ArrowUpOnSquareIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/vue/24/outline'

  import TextField from '@/components/Layout/TextField.vue'
  import Button from '@/components/Layout/Button.vue'
  import { useAppManagerStore } from '@/stores/app-manager'
  import { useGamejamStore } from '@/stores/gamejam'

  const gamejamStore = useGamejamStore()
  const appManagerStore = useAppManagerStore()

  const loading = ref(false)
  const fileInput = ref(null)
  const meta = ref([])
  const file = reactive({
    data: null,
    meta: null,
  })
  const form = reactive({
    title: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a Title'],
    },
    description: {
      value: '',
      error: false,
    },
    amount: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter an Amount'],
    },
    to: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a To'],
    },
    from: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a From'],
    },
  })

  const invalid = computed(
    () => Object.keys(form).some(v => form[v].error) || !file.data || meta.value.some(v => v.key.error || v.value.error)
  )

  const submit = async () => {
    loading.value = true

    try {
      const res = await gamejamStore.mintNft({
        title: form.title.value,
        description: form.description.value,
        amount: form.amount.value,
        to: form.to.value,
        from: form.from.value,
        meta: meta.value.map(v => ({
          key: v.key.value,
          value: v.value.value,
        })),
        base64: file.data,
      })

      if (!res.result) throw new Error(res.message)
      appManagerStore.showAlert({ color: 'success', text: res.message })

      form.title = { ...form.title, value: '', error: true }
      form.description = { ...form.description, value: '', error: false }
      form.amount = { ...form.amount, value: '', error: true }
      form.to = { ...form.to, value: '', error: true }
      form.from = { ...form.from, value: '', error: true }

      file.data = null
      file.meta = null

      meta.value = []
      loading.value = false

      // TODO: redirect here, or do whatever needs to happen post-minting xD
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
  }

  // const submit = async b64 => {
  //   try {
  //     emit('toggleLoading')

  //     const res = await userStore.uploadProfilePhoto({ base64: b64 })

  //     appManagerStore.showAlert({ color: 'success', text: 'Profile Picture Updated' })

  //     userStore.$patch({ user: { ...userStore.$state.user, profile_pic: b64 } }) // Update the userStore

  //     emit('updateProfilePic', b64)

  //     clear()
  //   } catch (err) {
  //     console.log('err:', err)
  //     appManagerStore.showAlert({
  //       color: 'error',
  //       text:
  //         err.message ||
  //         'An unknown error occurred. Please try again later and if the problem persists, contact support.',
  //     })
  //   }

  //   emit('toggleLoading')
  // }

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

  const addMeta = () => {
    meta.value.push({
      key: {
        value: '',
        error: true,
        rules: [v => !!v || 'Please enter a Key'],
      },
      value: {
        value: '',
        error: true,
        rules: [v => !!v || 'Please enter a Value'],
      },
    })
  }
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-16">
    <div class="flex justify-between items-center">
      <h5 class="text-slate-500 uppercase text-xl">Mint NFT</h5>
    </div>

    <div class="grid grid-cols-2 mt-8">
      <div class="relative w-64 h-64">
        <input ref="fileInput" type="file" class="hidden" @change="picked" />

        <div
          class="w-full h-full overflow-hidden flex items-center justify-center"
          :style="{
            'background-image': `url(${file.data})`,
            'background-color': '#374151',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
          }"
          @dragover.prevent
          @drop="() => dropFile($event.dataTransfer.files[0])"
        >
          <!-- <p
            v-if="!file.data"
            class="bg-gray-700 text-white flex items-center justify-center text-7xl"
          >
            {{ user.firstName?.substring(0, 1)?.toUpperCase() }}
          </p> -->
        </div>

        <button
          :class="`rounded-full absolute bottom-0 -left-2 w-10 h-10 shadow-sm flex items-center justify-center text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-indigo-700' : ''}
            ${!loading ? 'bg-indigo-600' : 'bg-gray-400'}`"
          @click="() => (file.data ? clear() : explorer())"
        >
          <ArrowPathIcon v-if="file.data" :style="{ width: '24px', height: '24px' }" />
          <ArrowUpOnSquareIcon v-else :style="{ width: '24px', height: '24px' }" />
        </button>
      </div>

      <form class="space-y-4">
        <TextField
          type="text"
          label="Title"
          :value="form.title.value"
          :error="form.title.error"
          :rules="form.title.rules"
          @value="val => (form.title.value = val)"
          @error="err => (form.title.error = err)"
        />

        <TextField
          type="text"
          label="Description"
          :value="form.description.value"
          @value="val => (form.description.value = val)"
        />

        <TextField
          type="text"
          label="Amount"
          :value="form.amount.value"
          :error="form.amount.error"
          :rules="form.amount.rules"
          @value="val => (form.amount.value = val)"
          @error="err => (form.amount.error = err)"
        />

        <TextField
          type="text"
          label="To"
          :value="form.to.value"
          :error="form.to.error"
          :rules="form.to.rules"
          @value="val => (form.to.value = val)"
          @error="err => (form.to.error = err)"
        />

        <TextField
          type="text"
          label="From"
          :value="form.from.value"
          :error="form.from.error"
          :rules="form.from.rules"
          @value="val => (form.from.value = val)"
          @error="err => (form.from.error = err)"
        />

        <div v-for="(meta, i) in meta" :key="i" class="flex gap-2">
          <TextField
            type="text"
            label="Key"
            :value="meta.key.value"
            :error="meta.key.error"
            :rules="meta.key.rules"
            @value="val => (meta.key.value = val)"
            @error="err => (meta.key.error = err)"
            class="w-full"
          />

          <TextField
            type="text"
            label="Value"
            :value="meta.value.value"
            :error="meta.value.error"
            :rules="meta.value.rules"
            @value="val => (meta.value.value = val)"
            @error="err => (meta.value.error = err)"
            class="w-full"
          />

          <button
            type="button"
            :disabled="loading"
            :class="`inline-flex items-center justify-center rounded-md border border-transparent p-2 font-normal mt-6
              focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-[#c71610a0]' : ''} h-full
              ${!loading ? 'bg-[#C71610]' : 'bg-gray-400'} text-2xl text-white shadow-sm`"
            @click="() => meta.splice(i, 1)"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <Button @click="addMeta" :disabled="loading" :loading="loading" :block="true">Add Field</Button>
        <Button @click="submit" :disabled="invalid" :loading="loading" :block="true">Submit</Button>
      </form>
    </div>
  </section>
</template>

<style></style>
