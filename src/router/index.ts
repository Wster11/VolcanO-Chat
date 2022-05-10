import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () => import("@/pages/Home/index.vue"),
    children: [
      {
        path: "/chat",
        name: "chat",
        component: () => import("@/pages/ChatList/index.vue")
      },
      {
        path: "/contact",
        name: "contact",
        component: () => import("@/pages/Contact/index.vue")
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/pages/User/index.vue")
      }
    ]
  },
  {
    path: "/chat/to/:chatType/:fromId",
    name: "chatDetail",
    component: () => import("@/pages/Chat/index.vue")
  },
  { path: "/login", component: () => import("@/pages/Login/index.vue") }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
