import { createRouter, createWebHistory } from "vue-router";
import ProductGrid from "../components/ProductGrid.vue";
import ProductDetail from "../components/ProductDetail.vue";

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
