import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'

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
          const res = await fetch('https://agg-apis-dot-mfg-oem.ew.r.appspot.com/project/types', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userStore.user.token,
            },
          }).then(res => res.json())

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

          const url = payload.id ? 'update' : 'create'
          const body = {
            name: payload.title,
            project_types: payload.type.text,
          }

          if (payload.id) body.id = payload.id
          if (payload.active) body.is_active = payload.active

          let res = await fetch(`https://agg-apis-dot-mfg-oem.ew.r.appspot.com/project/${url}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userStore.user.token,
            },
            body: JSON.stringify(body),
          }).then(res => res.json())

          const message = res.message
          console.log('create:', res)

          if (!res.result) throw new Error(res.detail)
          res = await this.fetchProjects()

          console.log('fetch:', res)

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
          const res = await fetch('https://agg-apis-dot-mfg-oem.ew.r.appspot.com/project/me', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userStore.user.token,
            },
          }).then(res => res.json())

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
