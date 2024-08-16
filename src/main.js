import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import ProductGrid from './components/ProductGrid.vue';
import ProductDetail from './components/ProductDetail.vue';
import Login from './components/Login.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import ComparisonPage from './components/ComparisonPage.vue';
import Wishlist from './components/Wishlist.vue';
import ProtectedComponent from './components/ProtectedComponent.vue';
import { requireAuth } from './auth';
import './assets/main.css';

/**
 * Route configurations for the application.
 * @type {Array<Object>}
 */
const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: ProductGrid,
    props: true
  },
  { 
    path: '/product/:id', 
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  { 
    path: '/cart', 
    name: 'ShoppingCart',
    component: ShoppingCart,
    meta: { requiresAuth: true }
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
    name: 'Protected',
    component: ProtectedComponent,
    meta: { requiresAuth: true }
  }
];

/**
 * Creates and configures the router for the application.
 * @returns {Router} The configured router instance.
 */
const router = createRouter({
  history: createWebHistory(),
  routes
});

/**
 * Global navigation guard to check authentication before accessing routes.
 * Redirects to the login page if the route requires authentication and the user is not logged in.
 * @param {Route} to - The target Route object.
 * @param {Route} from - The current Route object.
 * @param {Function} next - The function to resolve the navigation.
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

/**
 * Initializes and mounts the Vue application.
 */
const app = createApp(App);
app.use(router);
app.mount('#app');
