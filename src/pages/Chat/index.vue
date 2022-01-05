<template>
  <div class="chatDetailWrap">
    <NavBar :title="chat.userId" left-arrow @click-left="chat.toChat" />
    <div class="sendMsgWrap">
      <div class="richMsgWrap">
        <Icon class="icon" size="20" name="smile-o" />
        <Icon class="icon" size="20" name="photo-o" />
      </div>
      <Input @send="chat.sendMsg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router, useRoute } from "vue-router";
import Input from "@/components/input.vue";
import { NavBar, Icon } from "vant";
import { useStore } from "vuex";
import websdk from "easemob-websdk";
@Options({
  components: {
    NavBar,
    Input,
    Icon
  }
})
export default class Contact extends Vue {
  chat = setup(() => {
    const router: Router = useRouter();
    const route = useRoute();
    const store = useStore();
    const conn = store.state.IM.connect;
    const toChat = () => {
      router.push("/chat");
    };
    const sendMsg = (txt: string) => {
      let id = conn.getUniqueId(); // 生成本地消息id
      console.log(id, "233");
      let msg = new websdk.message("txt", id);
      msg.set({
        msg: txt, // 消息内容
        to: route.params.userId as string,
        chatType: "singleChat",
        success: () => {
          console.log("发送成功");
        },
        fail: () => {
          console.log("发送失败");
        }
      });

      conn.send(msg.body);

      console.log(msg, "2323");
    };

    return {
      toChat,
      userId: route.params.userId,
      sendMsg
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
  bottom: 1rem;
}
.richMsgWrap {
  padding: 2vw;
  text-align: left;
}
.icon {
  margin-right: 2vw;
}
</style>
