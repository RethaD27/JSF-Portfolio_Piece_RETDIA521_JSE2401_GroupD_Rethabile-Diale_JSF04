import { createRouter, createWebHistory } from "vue-router";
import ProductGrid from "../components/ProductGrid.vue";
import ProductDetail from "../components/ProductDetail.vue";
import Login from "../components/Login.vue";
import { requireAuth } from "../auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ProductGrid,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/protected",
    name: "Protected",
    component: () => import("../components/ProtectedComponent.vue"),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;