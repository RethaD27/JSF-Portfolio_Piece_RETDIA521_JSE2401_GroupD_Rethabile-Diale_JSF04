import { createRouter, createWebHistory } from 'vue-router';
import ProductGrid from '../components/ProductGrid.vue';
import ProductDetail from '../components/ProductDetail.vue';
import Login from '../components/Login.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import ProtectedComponent from '../components/ProtectedComponent.vue';
import ComparisonPage from '../components/ComparisonPage.vue';
import Wishlist from '../components/Wishlist.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductGrid,
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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

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