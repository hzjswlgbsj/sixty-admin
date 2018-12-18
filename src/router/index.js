import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { Cookie } from '../common'

Vue.use(Router)

let router = new Router({
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  let user = Cookie.get('sixtydenAmdinUser')

  if (!user && to.name !== 'login') {
    next({ path: '/login' })
  }

  next()
})

export default router
