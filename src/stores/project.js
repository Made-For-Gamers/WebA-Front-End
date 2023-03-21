import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useAppManagerStore } from '@/stores/app-manager'
// import router from '@/router'

export const useProjectStore = defineStore('project', {
  state: () => ({
    types: [],
    projects: [],
  }),

  actions: {
    fetchProjectTypes() {
      return new Promise(async (resolve, reject) => {
        try {
          const userStore = useUserStore()
          const appManagerStore = useAppManagerStore()

          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/project/types`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userStore.user.token,
            },
          })

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          res = await res.json()
          if (!res.result) throw new Error(res.detail)
          this.types = res.body.map(v => ({ value: v.id, text: v.name }))

          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },

    upsertProject(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const userStore = useUserStore()
          const appManagerStore = useAppManagerStore()

          const url = payload.id ? 'update' : 'create'
          const body = {
            name: payload.title,
            project_types: payload.type.text,
          }

          if (payload.id) body.id = payload.id
          if (payload.active) body.is_active = payload.active

          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/project/${url}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userStore.user.token,
            },
            body: JSON.stringify(body),
          })

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          res = await res.json()
          const message = res.message

          if (!res.result) throw new Error(res.detail)
          res = await this.fetchProjects()

          const project = res.body.find(v => v.name === payload.title)
          return resolve({ message, id: project?.id })
        } catch (err) {
          return reject(err)
        }
      })
    },

    fetchProjects() {
      return new Promise(async (resolve, reject) => {
        try {
          const userStore = useUserStore()
          const appManagerStore = useAppManagerStore()

          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/project/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userStore.user.token,
            },
          })

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          res = await res.json()

          if (!res.result) throw new Error(res.detail)
          this.projects = res.body

          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
