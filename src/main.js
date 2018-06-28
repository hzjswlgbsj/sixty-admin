import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import lodash from 'lodash'

Vue.use(iView)
Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '_', { value: lodash })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
