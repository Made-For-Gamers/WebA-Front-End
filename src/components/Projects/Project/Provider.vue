<script setup>
  import { onMounted, ref, reactive, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import {
    PlusCircleIcon,
    PlusIcon,
    ArrowPathIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
  } from '@heroicons/vue/24/outline'
  import { GithubIcon } from 'vue3-simple-icons'

  import { useAppManagerStore } from '@/stores/app-manager'
  import { useProviderFeatureStore } from '@/stores/providerFeature'

  import Divider from '@/components/Layout/Divider.vue'
  import TextField from '@/components/Layout/TextField.vue'
  import TextArea from '@/components/Layout/TextArea.vue'
  import Select from '@/components/Layout/Select.vue'
  import Button from '@/components/Layout/Button.vue'

  const { currentRoute } = useRouter()
  const appManagerStore = useAppManagerStore()
  const providerFeatureStore = useProviderFeatureStore()

  const loading = ref(false)
  const features = ref([])
  const creating = ref(false)

  const form = reactive({
    id: {
      value: null,
      error: false,
    },

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
      value: parseInt(currentRoute.value.params.id),
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

      const action = form.id.value ? 'updateFeature' : 'createFeature'
      const res = await providerFeatureStore[action](feature)
      appManagerStore.showAlert({ color: 'success', text: res.message })

      form.id = { ...form.id, value: null, error: false }
      form.name = { ...form.name, value: '', error: true }
      form.description = { ...form.description, value: '', error: false }
      form.feature_image_url = { ...form.feature_image_url, value: '', error: false }
      form.supported_engines = { ...form.supported_engines, value: '', error: false }
      form.documentation_url = { ...form.documentation_url, value: '', error: false }
      form.web_url = { ...form.web_url, value: '', error: false }
      form.git_url = { ...form.git_url, value: '', error: false }
      form.feature_type = { ...form.feature_type, value: null, error: true }
      form.api_key = { ...form.api_key, value: '', error: false }
      form.project_id = { ...form.project_id, value: parseInt(currentRoute.value.params.id), error: false }

      creating.value = false
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

  const publish = async feature => {
    try {
      loading.value = true

      await providerFeatureStore.updateFeature({ ...feature, is_live: true })
      appManagerStore.showAlert({
        color: 'success',
        text: `${feature.name} has been published and is now discoverable by users`,
      })
      feature.is_live = true
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

  const edit = feature => {
    creating.value = true

    form.id = { ...form.id, value: feature.id, error: false }
    form.name = { ...form.name, value: feature.name, error: false }
    form.description = { ...form.description, value: feature.description, error: false }
    form.feature_image_url = { ...form.feature_image_url, value: feature.feature_image_url, error: false }
    form.documentation_url = { ...form.documentation_url, value: feature.documentation_url, error: false }
    form.web_url = { ...form.web_url, value: feature.web_url, error: false }
    form.git_url = { ...form.git_url, value: feature.git_url, error: false }

    form.feature_type = {
      ...form.feature_type,
      value: providerFeatureStore.categories.find(v => v.text === feature.feature_type[0]),
      error: false,
    }

    form.api_key = { ...form.api_key, value: feature.api_key, error: false }

    feature.supported_engines.forEach(v => engines.value.push(v))
  }

  const toggleCreating = () => {
    creating.value = !creating.value

    if (!creating.value) {
      form.id = { ...form.id, value: null }
      form.name = { ...form.name, value: '', error: true }
      form.description = { ...form.description, value: '', error: false }
      form.feature_image_url = { ...form.feature_image_url, value: '', error: false }
      form.supported_engines = { ...form.supported_engines, value: '', error: false }
      form.documentation_url = { ...form.documentation_url, value: '', error: false }
      form.web_url = { ...form.web_url, value: '', error: false }
      form.git_url = { ...form.git_url, value: '', error: false }
      form.feature_type = { ...form.feature_type, value: null, error: true }
      form.api_key = { ...form.api_key, value: '', error: false }
      form.project_id = { ...form.project_id, value: parseInt(currentRoute.value.params.id), error: false }

      engines.value = []
    }
  }

  onMounted(async () => {
    providerFeatureStore.fetchCategories()

    // if (!providerFeatureStore.features?.some(v => v.project_id !== currentRoute.value.params.id)) {
    appManagerStore.loading = true
    const res = await providerFeatureStore.fetchFeatures(currentRoute.value.params.id)
    features.value = res.body?.sort((a, b) => (a.name > b.name ? 1 : -1)).map((v, i) => ({ ...v, open: i === 0 }))
    appManagerStore.loading = false
    // }
  })
</script>

<template>
  <div>
    <div
      :class="`col-span-2 ${creating ? 'rounded-t-lg' : 'rounded-lg mb-8'} shadow p-8 lg:mx-16
        cursor-pointer hover:shadow-lg bg-gray-200 mt-8`"
      @click="toggleCreating"
    >
      <h4 class="text-2xl lg:text-3xl font-audiowide">{{ form.id.value ? 'Edit' : 'Add New' }} Feature</h4>
    </div>

    <Transition name="slide-fade">
      <div v-if="creating" class="lg:mx-16 shadow rounded-b-lg mb-8 bg-white">
        <form class="w-full flex flex-col gap-4 p-4">
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
            :items="providerFeatureStore.categories"
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

              <Button @click="addEngine" class="mt-6">
                <PlusIcon class="h-5 w-5" />
              </Button>
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

          <div class="text-right">
            <button
              type="button"
              :disabled="invalid || loading"
              :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
              focus:outline-none focus:ring-2 focus:ring-offset-2 $${!invalid && !loading ? 'hover:bg-indigo-700' : ''}
              ${!invalid && !loading ? 'bg-indigo-600' : 'bg-gray-400'} text-2xl text-white shadow-sm`"
              @click="submit"
            >
              <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
              <span v-else>{{ form.id.value ? 'Update' : 'Add' }} Feature</span>
            </button>
          </div>
        </form>
      </div>
    </Transition>

    <div v-if="features.length > 0" class="lg:mx-16 my-8">
      <Divider color="bg-white text-white" />
    </div>

    <div v-for="feature in features" :key="feature.id" class="mb-4">
      <div
        :class="`col-span-2 ${feature.open ? 'rounded-t-lg' : 'rounded-lg'} shadow p-8 lg:mx-16
          cursor-pointer hover:shadow-lg bg-white`"
        @click="() => (feature.open = !feature.open)"
      >
        <h4 class="text-2xl lg:text-3xl font-audiowide">{{ feature.name }}</h4>
      </div>

      <Transition name="slide-fade">
        <div v-if="feature.open" class="grid grid-cols-3 lg:mx-16 shadow rounded-b-lg overflow-hidden bg-white">
          <section class="col-span-3 bg-gray-300 p-4 flex gap-4">
            <template
              v-for="link in [
                { icon: GithubIcon, prop: 'git_url', text: 'Code' },
                { icon: BookOpenIcon, prop: 'documentation_url', text: 'Docs' },
                { icon: QuestionMarkCircleIcon, prop: 'web_url', text: 'Website' },
              ]"
              :key="link.text"
            >
              <a
                v-if="feature[link.prop]"
                :href="feature[link.prop]"
                target="_blank"
                class="bg-white rounded-lg p-4 text-center w-28 hover:shadow-lg"
              >
                <component :is="link.icon" class="h-12 w-12 m-auto" />
                <p class="mt-2">{{ link.text }}</p>
              </a>
            </template>
          </section>

          <section class="col-span-2 bg-white p-4">
            <h4 class="text-2xl lg:text-3xl font-audiowide">{{ feature.name }}</h4>
            <p class="text-xl mt-4 bg-gray-300 px-2 py-1 rounded-full inline-block">{{ feature.feature_type[0] }}</p>
            <p class="text-xl mt-4">{{ feature.description }}</p>
          </section>

          <section class="col-span-1 row-span-3 bg-[#262626] p-4">
            <button
              v-if="!feature.is_live"
              type="button"
              :disabled="loading"
              :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
                focus:outline-none focus:ring-offset-2 $${!loading ? 'hover:bg-indigo-700' : ''}
                text-2xl focus:ring-2 ${!loading ? 'bg-indigo-600' : 'bg-gray-400'} text-white
                shadow-sm`"
              @click="() => publish(feature)"
            >
              <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
              <span v-else>Publish</span>
            </button>

            <button
              type="button"
              :disabled="loading"
              :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
                focus:outline-none focus:ring-offset-2 $${!loading ? 'hover:bg-indigo-700' : ''}
                text-2xl focus:ring-2 ${!loading ? 'bg-indigo-600' : 'bg-gray-400'} text-white
                shadow-sm`"
              @click="() => edit(feature)"
            >
              Edit
            </button>

            <p class="text-xl text-white mt-4">API Key: {{ feature.api_key }}</p>
            <p class="text-xl text-white mt-4">{{ feature.is_verified ? 'Verified' : 'Unverified' }}</p>
            <div class="flex gap-2 mt-4">
              <p v-for="engine in feature.supported_engines" :key="engine" class="bg-gray-300 px-2 py-1 rounded-full">
                {{ engine }}
              </p>
            </div>
          </section>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
  .slide-fade-enter-active {
    transition: all 0.5s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
</style>
