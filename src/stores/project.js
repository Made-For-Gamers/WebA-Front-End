import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: JSON.parse(`[
      { "id": 8774, "title": "Project Mayhem", "type": { "value": 1, "text": "Game" }},
      { "id": 9270, "title": "Project California", "type": { "value": 2, "text": "Feature"  }}
    ]`),
  }),

  actions: {
    createProject(payload) {
      return new Promise(async (resolve, reject) => {
        try {
          // TODO: update this with actual api deets
          const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: payload.title,
              type: payload.type,
            }),
          }).then(res => res.json())

          // TODO: remove this when the actual api deets are in
          res.result = true
          res.message = 'Project created'
          res.response_object = { id: Math.floor(Math.random() * 9999) + 1 }

          if (res.result) {
            this.projects.push({
              ...payload,
              id: res.response_object.id,
            })
          }

          resolve(res)
        } catch (err) {
          return reject(err)
        }
      })
    },
  },
})
