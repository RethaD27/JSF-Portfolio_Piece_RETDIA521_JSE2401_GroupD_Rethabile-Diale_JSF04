import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ProductGrid from './components/ProductGrid.vue'
import ProductDetail from './components/ProductDetail.vue'
import Login from './components/Login.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import { requireAuth } from './auth'
import ComparisonPage from './components/ComparisonPage.vue'
import Wishlist from './components/Wishlist.vue';
import './assets/main.css'

const routes = [
  { 
    path: '/', 
    component: ProductGrid,
    props: true
  },
  { 
    path: '/product/:id', 
    component: ProductDetail,
    props: true
  },
  {
    path: '/login',
    component: Login
  },
    { 
      path: '/cart', 
      component: ShoppingCart,
      beforeEnter: requireAuth
    },
    {
      path: '/comparison',
      name: 'Comparison',
      component: ComparisonPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist,
      meta: { requiresAuth: true },
    },
  {
    path: '/protected',
    component: () => import('./components/ProtectedComponent.vue'),
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')