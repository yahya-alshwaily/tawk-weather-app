import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: () => import("@/components/views/Home.vue") },
  { path: "/detail/:city", name: "Detail", component: () => import("@/components/views/Details.vue"), props: true },
  { path: "/profile", name: "Profile", component: () => import("@/components/views/Profile.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
