<script setup>
  import { ref, reactive, computed } from 'vue'
  import { PlusCircleIcon, ArrowPathIcon, PlusIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '@/stores/app-manager'
  import { useFeatureStore } from '@/stores/feature'

  import Modal from '@/components/Layout/Modal.vue'
  import TextField from '@/components/Layout/TextField.vue'
  import TextArea from '@/components/Layout/TextArea.vue'
  import Select from '@/components/Layout/Select.vue'

  const appManagerStore = useAppManagerStore()
  const featureStore = useFeatureStore()

  const props = defineProps({
    id: Number,
    name: String,
    type: String,
  })

  const loading = ref(false)
  const featuresDialogue = ref(false)
  const form = reactive({
    name: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a Feature Name'],
    },

    description: {
      value: '',
      error: false,
    },

    feature_image_url: {
      value: '',
      error: false,
    },

    supported_engines: {
      value: '',
      error: false,
    },

    documentation_url: {
      value: '',
      error: false,
    },

    web_url: {
      value: '',
      error: false,
    },

    git_url: {
      value: '',
      error: false,
    },

    feature_type: {
      value: null,
      error: true,
      rules: [v => !!v || 'Please select a Feature Category'],
    },

    api_key: {
      value: '',
      error: false,
    },

    project_id: {
      value: props.id,
      error: false,
    },
  })

  const engines = ref([])
  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const addEngine = () => {
    if (form.supported_engines.value) {
      engines.value.push(form.supported_engines.value)
      form.supported_engines = { ...form.supported_engines, value: '', error: false }
    }
  }

  const submit = async () => {
    try {
      loading.value = true

      const feature = Object.keys(form).reduce((s, v) => ({ ...s, [v]: form[v].value }), {})
      feature.supported_engines = engines.value
      feature.feature_type = [form.feature_type.value.text]

      const res = await featureStore.createFeature(feature)
      appManagerStore.showAlert({ color: 'success', text: res.message })

      form.name = { ...form.name, value: '', error: true }
      form.description = { ...form.description, value: '', error: false }
      form.feature_image_url = { ...form.feature_image_url, value: '', error: false }
      form.supported_engines = { ...form.supported_engines, value: '', error: false }
      form.documentation_url = { ...form.documentation_url, value: '', error: false }
      form.web_url = { ...form.web_url, value: '', error: false }
      form.git_url = { ...form.git_url, value: '', error: false }
      form.feature_type = { ...form.feature_type, value: null, error: true }
      form.api_key = { ...form.api_key, value: '', error: false }
      form.project_id = { ...form.project_id, value: props.id, error: false }

      featuresDialogue.value = false
    } catch (err) {
      console.log('err:', err)
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
  <div class="rounded-lg bg-white shadow hover:shadow-lg p-4 flex flex-col justify-between">
    <Modal :open="featuresDialogue" @close="() => (featuresDialogue = false)" :heading="`Add Feature to ${name}`">
      <template #content>
        <form class="w-full flex flex-col gap-4 max-h-[50vh] overflow-y-scroll pr-4">
          <TextField
            type="text"
            label="Feature Name"
            :value="form.name.value"
            :error="form.name.error"
            :rules="form.name.rules"
            @value="val => (form.name.value = val)"
            @error="err => (form.name.error = err)"
          />

          <TextArea
            label="Description"
            :value="form.description.value"
            @value="val => (form.description.value = val)"
            :rows="3"
          />

          <Select
            label="Feature Type"
            :items="featureStore.categories"
            :value="form.feature_type.value"
            :error="form.feature_type.error"
            :rules="form.feature_type.rules"
            @value="val => (form.feature_type.value = val)"
            @error="err => (form.feature_type.error = err)"
          />

          <TextField
            type="text"
            label="Image URL"
            :value="form.feature_image_url.value"
            @value="val => (form.feature_image_url.value = val)"
          />

          <div>
            <div class="flex gap-2">
              <TextField
                type="text"
                label="Supported Engines"
                :value="form.supported_engines.value"
                @value="val => (form.supported_engines.value = val)"
              />

              <button
                type="button"
                :disabled="loading"
                :class="`inline-flex items-center justify-center rounded-md border border-transparent p-2 font-normal mt-6
                focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-indigo-500' : ''} h-full
                ${!loading ? 'bg-indigo-600' : 'bg-gray-400'} text-2xl text-white shadow-sm`"
                @click="addEngine"
              >
                <PlusIcon class="h-5 w-5" />
              </button>
            </div>

            <div class="flex gap-2 mt-2">
              <div
                v-for="(engine, i) in engines"
                :key="engine"
                class="bg-gray-300 px-2 py-1 rounded-full cursor-pointer"
                @click="() => engines.splice(i, 1)"
              >
                {{ engine }}
              </div>
            </div>
          </div>

          <TextField
            type="text"
            label="Documentation URL"
            :value="form.documentation_url.value"
            @value="val => (form.documentation_url.value = val)"
          />

          <TextField
            type="text"
            label="Website URL"
            :value="form.web_url.value"
            @value="val => (form.web_url.value = val)"
          />

          <TextField
            type="text"
            label="Git URL"
            :value="form.git_url.value"
            @value="val => (form.git_url.value = val)"
          />

          <TextField
            type="text"
            label="API KEY"
            :value="form.api_key.value"
            @value="val => (form.api_key.value = val)"
          />
        </form>
      </template>

      <template #actions>
        <div class="flex gap-4">
          <button
            type="button"
            :disabled="loading"
            :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
              focus:outline-none focus:ring-2 focus:ring-offset-2 $${!loading ? 'hover:bg-gray-50' : ''}
              ${!loading ? 'bg-white' : 'bg-gray-400'} text-2xl text-gray-900 shadow-sm`"
            @click="() => (featuresDialogue = false)"
          >
            Cancel
          </button>

          <button
            type="button"
            :disabled="invalid || loading"
            :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
              focus:outline-none focus:ring-2 focus:ring-offset-2 $${!invalid && !loading ? 'hover:bg-indigo-700' : ''}
              ${!invalid && !loading ? 'bg-indigo-600' : 'bg-gray-400'} text-2xl text-white shadow-sm`"
            @click="submit"
          >
            <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
            <span v-else>Add Feature</span>
          </button>
        </div>
      </template>
    </Modal>

    <router-link class="mb-4" :to="`projects/${id}`">
      <h3 class="text-4xl">{{ name }}</h3>
      <p class="text-xl">{{ type }}</p>
    </router-link>

    <button v-if="type === 'Technology Provider'" class="w-8 h-8" @click="() => (featuresDialogue = true)">
      <PlusCircleIcon />
    </button>
  </div>
</template>

<style scoped></style>
