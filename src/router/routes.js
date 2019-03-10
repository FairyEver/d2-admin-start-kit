import demo from './modules/demo'
import modular from '@/modular/router'

import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    name: 'frame',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页 必须 name:index
      {
        path: 'index',
        name: 'index',
        meta,
        component: () => import('@/pages/index')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      },
      modular,
      ...demo
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  },
  // 403
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/error-page'),
    props: { code: 403 }
  },
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page'),
    props: { code: 404 }
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut]
