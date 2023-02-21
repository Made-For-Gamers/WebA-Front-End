import { defineStore } from "pinia";

export const useGamejamStore = defineStore("gamejam", {
  state: () => ({}),

  actions: {
    signup(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch(
            "https://agg-apis-dot-mfg-oem.ew.r.appspot.com/new_team",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          ).then((res) => res.json());

          // TODO: check here for a favorable response from server, else gooi an error with the message from server
          // e.g. if(!res.result) throw New Error(res.message)

          resolve(res);
        } catch (err) {
          return reject(err);
        }
      });
    },
  },
});
