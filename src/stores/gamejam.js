import { defineStore } from 'pinia'

export const useGamejamStore = defineStore('gamejam', {
  state: () => ({}),

  actions: {
    signup(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gamejam/new_team`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          res = await res.json()
          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },

    mintNft(payload) {
      console.log('submitting:', payload)

      return new Promise(async (resolve, reject) => {
        try {
          // TODO: sort out api deets (pretty much only url)

          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/add-url-here`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          // TODO: process response here, if needed

          res = await res.json()
          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
