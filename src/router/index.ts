import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
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
    path: "/chat/to/:fromId",
    name: "chatDetail",
    component: () => import("@/pages/Chat/index.vue")
  },
  { path: "/login", component: () => import("@/pages/Logins/index.vue") }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
