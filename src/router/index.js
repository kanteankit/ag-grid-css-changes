import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage.vue'

import agGridOffExisting from './agGridOffExisting'
import agGridOffProposed from './agGridOffProposed.js'
import agGridOn from './agGridOn.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // eslint-disable-line no-undef
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    ...agGridOffExisting,
    ...agGridOffProposed,
    ...agGridOn
  ]
})

export default router
