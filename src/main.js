import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'

Vue.use(iView)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
