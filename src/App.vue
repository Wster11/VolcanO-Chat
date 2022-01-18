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

@Options({
  components: {
    RouterView
  }
})
export default class App extends Vue {
  app = setup(() => {
    const router: Router = useRouter();
    onMounted(() => {
      document.oncontextmenu = function (e) {
        // 禁用浏览器菜单
        e.preventDefault();
      };
      const store = useStore();
      store.commit("IM/setConnect", conn);

      conn.addEventHandler("MESSAGE", {
        onTextMessage: (message) => {
          store.commit("IM/pushMessage", { fromId: message.from, message });
        },
        onImageMessage: (message) => {
          store.commit("IM/pushMessage", { fromId: message.from, message });
          console.log("收到图片消息了", message);
        },
        onFileMessage: (message) => {
          store.commit("IM/pushMessage", { fromId: message.from, message });
          console.log("收到附件消息了", message);
        },
        onVideoMessage: (message) => {
          store.commit("IM/pushMessage", { fromId: message.from, message });
          console.log("收到视频消息了", message);
        },
        onCustomMessage: (message) => {
          store.commit("IM/pushMessage", { fromId: message.from, message });
          console.log("收到自定义消息了", message);
        },
        onCmdMessage: (message) => {
          store.commit("IM/pushMessage", { fromId: message.from, message });
          console.log("收到命令消息了", message);
        },
        onRecallMessage: (message) => {
          store.commit("IM/deleteMessage", {
            fromId: message.from,
            id: message.mid
          });
          console.log("收到撤回消息了", message);
        },
        onDeliveredMessage: (message) => {
          console.log("收到送达回执消息了", message);
        },
        onChannelMessage: (message) => {
          console.log("收到会话已读回执消息了", message);
        },
        onReadMessage: (message) => {
          console.log("收到消息已读回执消息了", message);
        },
        onStatisticMessage:(message)=>{
           console.log("离线消息已读回执消息了", message);
        },
        
      });
      conn.addEventHandler("ERROR", {
        onError: (e) => {
          switch (e.message) {
            case ERROR_CODE.noAuth:
              router.push("/login");
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
body {
  background: #fdfdfd;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

@import "./base.css"; /*引入公共样式*/
</style>
