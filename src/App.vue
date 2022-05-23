<template>
  <RouterView />
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { RouterView, useRouter, Router } from "vue-router";
import { Dialog, Toast } from "vant";
import { onMounted } from "vue";
import { useStore } from "vuex";
import conn from "./initIm";
import { ERROR_CODE } from "@/const/errorCode";
import { getMessageFromId } from "@/utils/im";
import { CHAT_TYPE } from "./const";

@Options({
  components: {
    RouterView
  }
})
export default class App extends Vue {
  app = setup(() => {
    const router: Router = useRouter();
    const imToken: string | null = localStorage.getItem("token");
    const imUid: string | null = localStorage.getItem("uid");

    const loginByToken = () => {
      if (imToken && imUid) {
        conn
          .open({
            accessToken: imToken,
            user: imUid
          })
          .then(() => {
            router.push("/chat");
          })
          .catch(() => {
            router.push("/login");
          });
      } else {
        router.push("/login");
      }
    };

    onMounted(() => {
      loginByToken();

      document.oncontextmenu = function (e) {
        // 禁用浏览器菜单
        e.preventDefault();
      };
      const store = useStore();
      store.commit("IM/setConnect", conn);

      conn.addEventHandler("MESSAGE", {
        onTextMessage: (message) => {
          store.commit("IM/pushMessage", {
            fromId: getMessageFromId(message),
            message
          });
        },
        onImageMessage: (message) => {
          store.commit("IM/pushMessage", {
            fromId: getMessageFromId(message),
            message
          });
          console.log("收到图片消息了", message);
        },
        onFileMessage: (message) => {
          store.commit("IM/pushMessage", {
            fromId: getMessageFromId(message),
            message
          });
          console.log("收到附件消息了", message);
        },
        onVideoMessage: (message) => {
          store.commit("IM/pushMessage", {
            fromId: getMessageFromId(message),
            message
          });
          console.log("收到视频消息了", message);
        },
        onCustomMessage: (message) => {
          store.commit("IM/pushMessage", {
            fromId: getMessageFromId(message),
            message
          });
          console.log("收到自定义消息了", message);
        },
        onCmdMessage: (message) => {
          store.commit("IM/pushMessage", {
            fromId: getMessageFromId(message),
            message
          });
          console.log("收到命令消息了", message);
        },
        onRecallMessage: (message) => {
          // 撤回消息没有chatType, 所以单聊群组都查一下,然后删除
          store.commit("IM/deleteMessage", {
            fromId: `${CHAT_TYPE.singleChat}${message.from}`,
            id: message.mid
          });

          store.commit("IM/deleteMessage", {
            fromId: `${CHAT_TYPE.groupChat}${message.to}`,
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
        onReceivedMessage: (message) => {
          console.log("收到消息送达服务器消息了", message);
        },
        onReadMessage: (message) => {
          console.log("收到消息已读回执消息了", message);
          // conn.getGroupMsgReadUser({
          //   msgId: message.mid as string, // 消息 ID
          //   groupId: "170933540159489" // 群组 ID
          // }).then((res)=>{
          //   console.log(res, 'res777788888')
          // });
        },
        onStatisticMessage: (message) => {
          console.log("离线消息已读回执消息了", message);
        },
        onContactAgreed: (message) => {
          Toast(`${message.from}已经同意您的好友申请`);
        },
        onContactRefuse: (message) => {
          Toast(`${message.from}拒绝了您的好友申请`);
        },
        onContactDeleted: (message) => {
          Toast(`${message.from}解除了与您的好友关系`);
        },
        onContactInvited: (message) => {
          Dialog.confirm({
            title: `${message.from}请求添加您为好友`,
            message: message.status
          })
            .then(() => {
              conn.acceptContactInvite(message.from);
            })
            .catch(() => {
              conn.declineContactInvite(message.from);
            });
        }
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
