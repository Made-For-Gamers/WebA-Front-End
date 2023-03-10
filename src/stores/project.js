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

    createProject(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          // console.log('types:', this.types)
          // console.log('payload:', payload.type.text)
          // console.log('type:', this.types.find(v => v.text === payload.type.text)?.name)

          // return resolve

          const userStore = useUserStore()
          let res = await fetch('https://agg-apis-dot-mfg-oem.ew.r.appspot.com/project/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userStore.user.token,
            },
            body: JSON.stringify({
              name: payload.title,
              project_types: payload.type.text,
            }),
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
