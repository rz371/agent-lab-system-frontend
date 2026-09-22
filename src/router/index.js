import { getToken } from '@/utils/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/manager/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/manager',
      name: 'Layout',
      component: () => import('@/layouts/Layout.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/Homepage.vue')
        },
        {
          path: 'lab',
          name: 'Lab',
          component: () => import('@/views/LabManage.vue')
        },
        {
          path:'user',
          name:'User',
          component:() => import('@/views/User.vue'),
          children:[
            {
              path:'/personal',
              name:'Personal',
              component:() => import('@/views/Personal.vue')
            },
            {
              path:'/pwd',
              name:'Pwd',
              component:() => import('@/components/Password.vue')
            }
          ]
        }
      ]
    },
    
  ]
})

// 路由守卫
router.beforeEach((to,from) => {
  const token = getToken()
  if(to.path === '/login' || to.path === '/register'){
    // router 4 用return true来下一步
    return true
  } else {
    
    return token ?  true : '/login'
  }
})
export default router
