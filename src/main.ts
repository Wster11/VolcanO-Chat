import { createApp } from "vue";
import router from "./router";
import store from "./store/index";
import App from "./App.vue";
import { Toast } from "vant";

createApp(App).use(router).use(store).use(Toast).mount("#app");
