import { defineStore } from 'pinia'

export const useAppManagerStore = defineStore('appManager', {
  state: () => ({
    appName: 'Made for Gamers',
  }),

  // getters: {
  //   appNamePlusOne: state => `${state.appName} + 1`,
  // },

  // actions: {
  //   updateAppName(payload) {
  //     this.appName = payload
  //   },
  // },
})
