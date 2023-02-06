import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    token: null,
  }),

  actions: {
    exchangeMetamaskTokenForJwt(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ metamaskToken: payload.token }),
          }).then(res => res.json())

          // TODO: check here for a favorable response from server, else gooi an error with the message from server
          // e.g. if(!res.result) throw New Error(res.message)

          const user = {
            ...res,
            token: '123456-123456-123456-123456',
          }

          this.token = user.token

          return resolve(user)
        } catch (err) {
          return reject(err)
        }
      })
    },

    exchangeGoogleTokenForJwt(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ googleToken: payload.token }),
          }).then(res => res.json())

          // TODO: check here for a favorable response from server, else gooi an error with the message from server
          // e.g. if(!res.result) throw New Error(res.message)

          const user = {
            ...res,
            token: '654321-654321-654321-654321',
          }

          this.token = user.token

          return resolve(user)
        } catch (err) {
          return reject(err)
        }
      })
    },

    loginWithEmailAndPassword(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }).then(res => res.json())

          // TODO: check here for a favorable response from server, else gooi an error with the message from server
          // e.g. if(!res.result) throw New Error(res.message)

          const user = {
            ...res,
            token: '654321-654321-654321-654321',
          }

          this.token = user.token

          return resolve(user)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
