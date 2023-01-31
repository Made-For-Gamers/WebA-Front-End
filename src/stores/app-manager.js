import { defineStore } from 'pinia'

export const useAppManagerStore = defineStore('appManager', {
  state: () => ({
    appName: 'Made for Gamers',
  }),

  // getters: {
  //   appNamePlusOne: state => `${state.appName} + 1`,
  // },

  actions: {
    submitContactForm(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          // TODO: update this with actual api deets
          const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fName: payload.fName,
              lName: payload.lName,
              email: payload.email,
              message: payload.message,
              // TODO: add recaptcha key
            }),
          }).then(res => res.json())

          // TODO: check here for a favorable response from server, else gooi an error with the message from server
          // e.g. if(!res.result) throw New Error(res.message)

          resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
