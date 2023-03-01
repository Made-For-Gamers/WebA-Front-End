import { defineStore } from 'pinia'

export const useGamejamStore = defineStore('gamejam', {
  state: () => ({}),

  actions: {
    signup(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch('https://agg-apis-dot-mfg-oem.ew.r.appspot.com/new_team', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }).then(res => res.json())

          resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
