import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/Home/index.vue";
import Login from "@/pages/Login/index.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
