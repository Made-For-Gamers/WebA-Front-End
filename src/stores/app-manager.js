import { defineStore } from 'pinia'

export const useAppManagerStore = defineStore('appManager', {
  state: () => ({
    appName: 'Made for Gamers',
    alert: {},
    loading: false,
  }),

  actions: {
    showAlert(payload) {
      this.alert = { visible: true, ...payload }
      setTimeout(this.hideAlert, payload.timeout || 10000)
    },

    hideAlert() {
      this.alert = { visible: false }
    },

    submitContactForm(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              first_name: payload.fName,
              last_name: payload.lName,
              email: payload.email,
              message: payload.message,
              recaptcha_token: payload.recaptcha_token,
            }),
          }).then(res => res.json())

          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
