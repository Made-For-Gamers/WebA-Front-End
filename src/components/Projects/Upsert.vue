<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'
  import { useRouter } from 'vue-router'

  import router from '@/router'
  import { useAppManagerStore } from '@/stores/app-manager'
  import { useProjectStore } from '@/stores/project'

  import TextField from '@/components/Layout/TextField.vue'
  import Select from '@/components/Layout/Select.vue'

  const props = defineProps({ loading: Boolean })

  const { currentRoute } = useRouter()
  const appManagerStore = useAppManagerStore()
  const projectStore = useProjectStore()

  const form = reactive({
    id: {
      value: null,
      error: false,
    },
    active: {
      value: null,
      error: false,
    },
    title: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a Project Title'],
    },
    type: {
      value: null,
      error: true,
      rules: [v => !!v || 'Please enter a Project Type'],
    },
  })

  const loading = ref(false)
  const invalid = computed(() => Object.keys(form).some(v => form[v].error))

  const submit = async () => {
    try {
      loading.value = true

      const res = await projectStore.upsertProject(
        Object.keys(form).reduce((s, v) => ({ ...s, [v]: form[v].value }), {})
      )

      // TODO: depending on the project type, add a sentence that tells the user what to do next
      appManagerStore.showAlert({ color: 'success', text: res.message })

      form.id = { ...form.id, value: null, error: false }
      form.active = { ...form.active, value: null, error: false }
      form.title = { ...form.title, value: '', error: true }
      form.type = { ...form.type, value: null, error: true }

      return router.push(`/projects/${res.id}`)
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

  onMounted(async () => {
    await projectStore.fetchProjectTypes()

    if (currentRoute.value.name === 'EditProject') {
      if (!projectStore.projects.length) {
        await projectStore.fetchProjects()
      }

      const project = projectStore.projects.find(v => v.id === parseInt(currentRoute.value.params.id))
      if (!project) {
        appManagerStore.showAlert({
          color: 'warning',
          text: `Project with id ${currentRoute.value.params.id} not found.`,
        })
        router.push('/projects')
      }

      form.id = { ...form.id, value: project.id }
      form.active = { ...form.active, value: project.is_active }
      form.title = { ...form.title, value: project.name, error: false }
      form.type = {
        ...form.type,
        value: projectStore.types.find(v => v.text === project.project_types),
        error: false,
      }
    }
  })
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52 my-8">
    <form class="col-span-2 space-y-4">
      <h3 class="text-2xl font-medium">{{ currentRoute.name === 'CreateProjects' ? 'Create New' : 'Edit' }} Project</h3>

      <TextField
        type="text"
        label="Project Title"
        :value="form.title.value"
        :error="form.title.error"
        :rules="form.title.rules"
        @value="val => (form.title.value = val)"
        @error="err => (form.title.error = err)"
      />

      <Select
        label="Project Type"
        :items="projectStore.types"
        :value="form.type.value"
        :error="form.type.error"
        :rules="form.type.rules"
        @value="val => (form.type.value = val)"
        @error="err => (form.type.error = err)"
      />

      <button
        type="button"
        :disabled="invalid || loading"
        :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${!invalid && !loading ? 'hover:bg-indigo-700' : ''}
        w-full text-2xl ${!invalid && !loading ? 'bg-indigo-600' : 'bg-gray-400'} text-white shadow-sm`"
        @click="submit"
      >
        <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
        <span v-else>
          {{ currentRoute.name === 'CreateProjects' ? 'Create' : 'Edit' }}
        </span>
      </button>
    </form>
  </section>
</template>

<style></style>
