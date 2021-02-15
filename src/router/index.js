import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/dashboard/Dashboard'
import Login from '../views/auth/Login'
import Forgotpassword from '../views/auth/Forgotpassword'
import Resetpassword from '../views/auth/Resetpassword'
import Notifresetpassword from '../views/auth/Notifresetpassword'
import store from '../store'
import Sparing from '../views/sparing/Sparing'
import Report from '../views/report/Report'
import Profile from '../views/profile/Profile'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgotpassword 
  },
  {
    path: '/reset-password/:token',
    name: 'Reset-password',
    component: Resetpassword
  },
  {
    path: '/notif-reset/:email',
    name: 'Notif-reset',
    component: Notifresetpassword
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true
    }
  },
  {
    path: '/sparing',
    mame: 'Sparing',
    component: Sparing,
    meta: {
      auth: true
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    meta: {
      auth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: true
    }
  }
]

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0,}
  },
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth && !store.getters['auth/authenticated']) next({name:'Login'})
  else next()
  if(!to.meta.auth && store.getters['auth/authenticated']) next({name: 'Dashboard'})
  else next()

})

export default router
