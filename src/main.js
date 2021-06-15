import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { rtdbPlugin } from 'vuefire'
import 'bootstrap'
require('./assets/css/icons/icomoon/styles.min.css')
require('./assets/css/bootstrap.css')
require('./assets/css/limitless.css')
require('./assets/css/layout.min.css')
require('./assets/css/components.css')
require('./assets/css/colors.css')
require('./assets/css/datepicker.css')
window.$ = window.jQuery = require('jquery')
require('./assets/js/datepicker')
axios.defaults.withCredentials= true;
axios.defaults.baseURL='https://apidemo.satcomm.co.id/'



Vue.use(rtdbPlugin)
Vue.config.productionTip = false


store.dispatch('auth/me').finally(() => {
  axios.interceptors.request.use(
    config => {
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    response => {
      if(response.status === 200 || response.status === 201 || response.status === 204) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    },
    error => {
      if(error.response.status) {
        switch (error.response.status) {
          case 400:
  
          break;
          case 401:
            store.dispatch('auth/expired')
            router.replace('/login')
          break;
        }
      }
      return Promise.reject(error.response)
    }
  )
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
