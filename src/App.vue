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
      conn.addEventHandler("CONNECTION", {
        onConnected: () => {
          console.log("onConnected");
          router.push("/chat");
        }
      });

      conn.addEventHandler("MESSAGE", {
        onTextMessage: (message) => {
          store.commit("IM/updateChat", { fromId: message.from, message });
        },
        onImageMessage: (message) => {
          store.commit("IM/updateChat", { fromId: message.from, message });
          console.log("收到图片消息了", message);
        },
        onFileMessage: (message) => {
          store.commit("IM/updateChat", { fromId: message.from, message });
          console.log("收到附件消息了", message);
        },
        onVideoMessage: (message) => {
          store.commit("IM/updateChat", { fromId: message.from, message });
          console.log("收到视频消息了", message);
        }
      });
      conn.addEventHandler("ERROR", {
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
      //3.0 监听事件写法
      conn.listen({
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
  height: 100vh;
  overflow: hidden;
}

body {
  background: #fdfdfd;
}

@import "./base.css"; /*引入公共样式*/
</style>
