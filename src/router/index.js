import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

import Articles from '@/components/article/Articles'
import CreateArticle from '@/components/article/CreateArticle'
import EditArticle from '@/components/article/EditArticle'
import orderList from '@/components/orders/orderList'
import orderDetail from '@/components/orders/orderDetail'

import productDetail from '@/components/product/ProductDetail'
import productList from '@/components/product/ProductList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      redirect: {
        name: 'login'
      },
      component: Home,
      iconCls: 'el-icon-message',
      children: [
        {
          path: '/products',
          name: 'products',
          component: productList
        }
      ]
    },
    {
      path: '/articles',
      redirect: {
        name: 'articleList'
      },
      name: 'articles',
      component: Home,
      children: [
        {
          path: '/articles/list',
          name: 'articleList',
          component: Articles
        },
        {
          path: '/articles/create',
          name: 'createArticle',
          component: CreateArticle
        },
        {
          path: '/articles/:id',
          name: 'editArticle',
          component: EditArticle
        }
      ]
    },
    {
      path: '/products',
      redirect: {
        name: 'productList'
      },
      name: 'products',
      component: Home,
      children: [{
        path: '/products/list',
        name: 'productList',
        component: productList
      }, {
        path: '/products/:id',
        name: 'productDetail',
        component: productDetail
      }, {
        path: '/products/create',
        name: 'productCreate',
        component: productDetail
      }]
    },
    {
      path: '/orders',
      redirect: {
        name: 'orderList'
      },
      name: 'orders',
      component: Home,
      children: [
        {
          path: '/orders/list',
          name: 'orderList',
          component: orderList
        },
        {
          path: '/orders/:id',
          name: 'orderDetail',
          component: orderDetail
        }
      ]
    }
  ]
})
