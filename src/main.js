import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
Vue.prototype.$http = Axios.create({
  baseURL: 'localhost:3000',
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json'
    }
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
