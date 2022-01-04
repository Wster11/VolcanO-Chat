import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/Home/index.vue"),
    children: [
      {
        path: "/chat", //首页是默认子路由，所谓为空
        name: "chat",
        component: () => import("@/pages/ChatList/index.vue")
      },
      {
        path: "/contact", //首页是默认子路由，所谓为空
        name: "contact",
        component: () => import("@/pages/Contact/index.vue")
      },
      {
        path: "/user", //首页是默认子路由，所谓为空
        name: "user",
        component: () => import("@/pages/User/index.vue")
      }
    ]
  },
  { path: "/login", component: () => import("@/pages/Login/index.vue") }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
