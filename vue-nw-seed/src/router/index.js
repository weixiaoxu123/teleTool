import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Support from '@/components/Support'
import SalesMan from '@/components/SalesMan'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/support',
      name: 'Support',
      component: Support
    },
    {
      path: '/salesman',
      name: 'SalesMan',
      component: SalesMan
    }
  ]
})
