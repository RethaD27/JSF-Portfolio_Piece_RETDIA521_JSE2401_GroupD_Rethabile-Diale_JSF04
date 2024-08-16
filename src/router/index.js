import { createRouter, createWebHistory } from 'vue-router';
import ProductGrid from '../components/ProductGrid.vue';
import ProductDetail from '../components/ProductDetail.vue';
import Login from '../components/Login.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import ProtectedComponent from '../components/ProtectedComponent.vue';
import ComparisonPage from '../components/ComparisonPage.vue';
import Wishlist from '../components/Wishlist.vue';

/**
 * @typedef {Object} RouteConfig
 * @property {string} path - The path of the route.
 * @property {string} name - The name of the route.
 * @property {Object} component - The component associated with the route.
 * @property {boolean} [props=false] - Whether route parameters should be passed as props to the component.
 * @property {Object} [meta] - Metadata for the route.
 * @property {boolean} [meta.requiresAuth=false] - Whether the route requires authentication.
 */

/**
 * Array of route configurations for the application.
 * @type {RouteConfig[]}
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
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
    meta: { requiresAuth: true },
  },
  {
    path: '/protected',
    name: 'Protected',
    component: ProtectedComponent,
    meta: { requiresAuth: true },
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
];

/**
 * Creates a new Vue Router instance with a history mode and the defined routes.
 * @returns {import('vue-router').Router} The router instance.
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Navigation guard to check for authentication on routes that require it.
 * Redirects to the login page if the user is not authenticated.
 * 
 * @param {import('vue-router').RouteLocationNormalized} to - The target Route Object being navigated to.
 * @param {import('vue-router').RouteLocationNormalized} from - The current route being navigated away from.
 * @param {Function} next - Function to resolve the hook. Must be called to move to the next hook in the pipeline.
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

export default router;
