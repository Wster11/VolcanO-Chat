import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Login from "../pages/login/index.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/login", component: Login }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
