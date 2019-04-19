import Vue from 'vue'
import Router from 'vue-router'




// 引入组件
import loadPage from '@/components/loadPage'
import firstPage from '@/components/firstPage'
import secondPage from '@/components/secondPage'
import makingPage from '@/components/makingPage'
import thirdPage from '@/components/thirdPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loadPage',
      component: loadPage
    },{
      path: '/firstPage',
      name: 'firstPage',
      component: firstPage
    },{
      path: '/secondPage',
      name: 'secondPage',
      component: secondPage
    },{
      path: '/makingPage',
      name: 'makingPage',
      component: makingPage
    },{
      path: '/thirdPage',
      name: 'thirdPage',
      component: thirdPage
    }
  ]
})
