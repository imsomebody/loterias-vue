import { createRouter, createWebHistory } from "vue-router";

import ManagerView from "@/views/ManagerView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/manager",
      name: "manager",
      component: ManagerView,
    },
  ],
});

export default router;
