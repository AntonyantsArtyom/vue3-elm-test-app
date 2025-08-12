import { createRouter, createWebHistory } from "vue-router";

import OrdersPage from "@/pages/OrdersPage.vue";
import IncomesPage from "@/pages/IncomesPage.vue";
import SalesPage from "@/pages/SalesPage.vue";
import StocksPage from "@/pages/StocksPage.vue";

const routes = [
  {
    path: "/",
    children: [
      { path: "incomes", component: IncomesPage },
      { path: "orders", component: OrdersPage },
      { path: "sales", component: SalesPage },
      { path: "stocks", component: StocksPage },
      { path: "", redirect: "/incomes" },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
