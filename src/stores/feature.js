import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useAppManagerStore } from '@/stores/app-manager'
import router from '@/router'

export const useFeatureStore = defineStore('feature', {
  state: () => ({
    categories: [],
    features: [],
  }),

  actions: {
    fetchCategories() {
      return new Promise(async (resolve, reject) => {
        try {
          const userStore = useUserStore()

          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/feature/categories`, {
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
          this.categories = res.body.map(v => ({ value: v.id, text: v.name }))

          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },

    createFeature(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const userStore = useUserStore()

          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/feature/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userStore.user.token,
            },
            body: JSON.stringify({
              ...payload,
              is_active: true,
              is_live: false,
              is_verified: false,
            }),
          })

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          res = await res.json()
          if (!res.result) throw new Error(res.detail)
          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
