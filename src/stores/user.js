import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    profilePic: null,
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

          const user = {
            ...res,
            token: '123456-123456-123456-123456',
            firstName: 'John',
            lastName: 'Doe',
            email: 'hello@john-doe.com',
            profilePic: null,
            // 'https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png',
          }

          this.$state = user
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

    triggerForgotPassword(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }).then(res => res.json())

          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },

    updateProfile(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }).then(res => res.json())

          // this.firstName = payload.fName
          // this.lastName = payload.lName

          this.$state = {
            ...this.$state,
            ...payload,
          }

          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },

    uploadProfilePhoto(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }).then(res => res.json())

          this.profilePic = payload.base64
          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },

    changePassword(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }).then(res => res.json())

          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
