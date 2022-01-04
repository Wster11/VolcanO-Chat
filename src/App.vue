<template>
  <RouterView />
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { RouterView, useRouter, Router } from "vue-router";
import { onMounted } from "vue";
import { useStore } from "vuex";
import conn from "./initIm";
import { ERROR_CODE } from "@/const/errorCode";
import { Toast } from "vant";

@Options({
  components: {
    RouterView
  }
})
export default class App extends Vue {
  app = setup(() => {
    const router: Router = useRouter();
    onMounted(() => {
      const store = useStore();
      store.commit("IM/setConnect", conn);
      conn.listen({
        onOpened: () => {
          // 登录成功跳转
          router.push("/chat");
        },
        onError: (e) => {
          switch (e.message) {
            case ERROR_CODE.noAuth:
              router.push("/login");
              break;
            case ERROR_CODE.loginFailed:
              Toast("用户名或密码错误");
              break;
            default:
              break;
          }
        }
      });
    });
    return {};
  });
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background: #fdfdfd;
}
</style>
