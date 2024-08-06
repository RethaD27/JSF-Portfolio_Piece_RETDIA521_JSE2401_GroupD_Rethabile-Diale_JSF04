import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ProductGrid from './components/ProductGrid.vue'
import ProductDetail from './components/ProductDetail.vue'

const routes = [
  { 
    path: '/', 
    component: ProductGrid,
    props: true  // This allows the component to receive props from the router-view
  },
  { 
    path: '/product/:id', 
    component: ProductDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')