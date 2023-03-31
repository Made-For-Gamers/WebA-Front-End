import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useAppManagerStore } from '@/stores/app-manager'
import router from '@/router'

export const useGameFeatureStore = defineStore('gameFeature', {
  state: () => ({
    categories: [],
    features: [],
  }),

  actions: {
    linkFeature(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const userStore = useUserStore()

          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/project_feature/link`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userStore.user.token,
            },
            body: JSON.stringify({
              id: payload.id,
              project_id: payload.project_id,
              feature_id: payload.feature_id,
              is_active: payload.is_active,
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

    fetchFeatures(project_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const userStore = useUserStore()

          let res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/project_feature/me?${new URLSearchParams({ project_id })}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': userStore.user.token,
              },
            }
          )

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          res = await res.json()
          res.body = res.body || []
          if (!res.result) throw new Error(res.detail)
          this.features = res.body

          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
