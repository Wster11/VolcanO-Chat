<template>
  <div class="chatDetailWrap">
    <NavBar :title="chat.fromId" left-arrow @click-left="chat.toChat" />
    <div class="msgWrap">
      <div
        v-for="item in chat.chatInfo[chat.fromId]?.messageList"
        :key="item.id"
      >
        <MsgLeft v-if="item.from" :msg="item.msg" :timestamp="item.time" />
        <MsgRight v-else :msg="item.msg" :timestamp="item.time" />
      </div>
    </div>
    <div class="sendMsgWrap">
      <div class="richMsgWrap">
        <Icon class="icon" size="20" name="smile-o" />
        <Icon class="icon" size="20" name="photo-o" />
      </div>
      <Input ref="ipt" @send="chat.sendMsg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router, useRoute } from "vue-router";
import Input from "@/components/input.vue";
import { NavBar, Icon } from "vant";
import { useStore } from "vuex";
import { getCurrentInstance } from "vue";
import websdk, { EasemobChat } from "easemob-websdk";
import { MSG_TYPE, CHAT_TYPE } from "@/const";
import { ERROR_CODE } from "@/const/errorCode";
import MsgLeft from "@/components/messageLeft.vue";
import MsgRight from "@/components/messageRight.vue";

@Options({
  components: {
    NavBar,
    Input,
    Icon,
    MsgLeft,
    MsgRight
  }
})
export default class Contact extends Vue {
  chat = setup(() => {
    const router: Router = useRouter();
    const route = useRoute();
    const store = useStore();
    const conn = store.state.IM.connect;
    const instance = getCurrentInstance();
    const fromId = route.params.fromId as string;
    const toChat = () => {
      router.push("/chat");
    };

    const sendMsg = (txt: string) => {
      let msg = websdk.message.create({
        chatType: CHAT_TYPE.singleChat as EasemobChat.ChatType,
        type: MSG_TYPE.txt as "txt",
        to: fromId,
        msg: txt,
        ext: { extra: "附加消息" } // 发送附加消息
      });

      conn
        .send(msg)
        .then(() => {
          console.log("发送成功");
          const ipt: any = instance?.refs.ipt;
          ipt.ipt.clear();
          store.commit("IM/updateChat", { fromId, message: msg });
        })
        .catch((e: any) => {
          if (e.message === ERROR_CODE.notLogin) {
            console.log("未登录");
          }
          console.log(e, "发送失败");
        });
    };

    return {
      toChat,
      sendMsg,
      fromId: fromId,
      chatInfo: store.state.IM.chat
    };
  });
}
</script>

<style scoped>
.sendMsgWrap {
  width: 100%;
  padding: 2vw;
  border-top: 1px solid lightgray;
  position: absolute;
  bottom: 1vw;
}
.richMsgWrap {
  padding: 2vw;
  text-align: left;
}
.msgWrap {
  padding: 10px;
  height: calc(100vh - 100px - 15vw);
  overflow: scroll;
}
.icon {
  margin-right: 2vw;
}
</style>
