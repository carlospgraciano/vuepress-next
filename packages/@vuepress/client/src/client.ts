import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { createVueApp } from './createVueApp'

createVueApp({
  appCreator: createApp,
  historyCreator: createWebHistory,
}).then(({ app, router }) => {
  router.isReady().then(() => {
    app.mount('#app')
  })
})
