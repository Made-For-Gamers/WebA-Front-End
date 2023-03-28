import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  persist: true,

  state: () => ({
    user: {
      token: null,
    },
  }),

  actions: {
    registerWithEmailAndPassword(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/signup`, {
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

    loginWithEmailAndPassword(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              username: payload.email,
              password: payload.password,
              recaptcha_token: payload.recaptcha_token,
            }),
          })

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          res = await res.json()
          if (!res.access_token) throw new Error(res.detail)
          this.user.token = `Bearer ${res.access_token}`

          res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/users/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.user.token,
            },
          })

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          res = await res.json()
          if (!res.result) throw new Error(res.detail)
          this.user = { ...this.user, ...res.body }

          return resolve(res)
        } catch (err) {
          console.log('err:', err)
          return reject(err)
        }
      })
    },

    triggerForgotPassword(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users/forgot-password?${new URLSearchParams(payload)}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: {},
            }
          )

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

    resetPassword(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users/reset-password?${new URLSearchParams(payload)}`,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            }
          )

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

    exchangeNearTokenForJwt(payload) {
      return new Promise(async (resolve, reject) => {
        try { 
          let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/tokenW3wallet`, {
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
          if (!res.access_token) throw new Error(res.detail)
          this.user.token = `Bearer ${res.access_token}`

          res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/users/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.user.token,
            },
          })

          if (res.status === 401) {
            appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
            userStore.user.token = null
            location.reload()
          }

          res = await res.json()
          if (!res.result) throw new Error(res.detail)
          this.user = { ...this.user, ...res.body }

          return resolve(res)
        } catch (err) {
          console.log('err:', err)
          return reject(err)
        }
      })
    },

    // exchangeMetamaskTokenForJwt(payload) {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/tokenW3wallet`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(payload),
    //       })

    //       if (res.status === 401) {
    //         appManagerStore.showAlert({ color: 'warning', text: 'Please login before proceeding' })
    //         userStore.user.token = null
    //         location.reload()
    //       }

    //       res = await res.json()

    //       const user = {
    //         ...res,
    //         token: '123456-123456-123456-123456',
    //         name: 'John',
    //         lastName: 'Doe',
    //         email: 'hello@john-doe.com',
    //         // profilePic: null,
    //         // 'https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png',
    //       }

    //       this.$state = user
    //       return resolve(user)
    //     } catch (err) {
    //       return reject(err)
    //     }
    //   })
    // },

    // exchangeGoogleTokenForJwt(payload) {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ googleToken: payload.token }),
    //       }).then(res => res.json())

    //       const user = {
    //         ...res,
    //         token: '654321-654321-654321-654321',
    //       }

    //       this.token = user.token

    //       return resolve(user)
    //     } catch (err) {
    //       return reject(err)
    //     }
    //   })
    // },

    // updateProfile(payload) {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(payload),
    //       }).then(res => res.json())

    //       // this.name = payload.fName
    //       // this.lastName = payload.lName

    //       this.$state = {
    //         ...this.$state,
    //         ...payload,
    //       }

    //       return resolve(res)
    //     } catch (err) {
    //       return reject(err)
    //     }
    //   })
    // },

    // uploadProfilePhoto(payload) {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(payload),
    //       }).then(res => res.json())

    //       this.profilePic = payload.base64
    //       return resolve(res)
    //     } catch (err) {
    //       return reject(err)
    //     }
    //   })
    // },

    // this is supposed to be when a user willingly changes his password
    // changePassword(payload) {
    //   return new Promise(async (resolve, reject) => {
    //     try {
    //       const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(payload),
    //       }).then(res => res.json())

    //       return resolve(res)
    //     } catch (err) {
    //       return reject(err)
    //     }
    //   })
    // },
  },
})
