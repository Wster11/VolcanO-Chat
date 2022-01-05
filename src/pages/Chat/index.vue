<template>
  <div class="chatDetailWrap">
    <NavBar :title="chat.userId" left-arrow @click-left="chat.toChat" />
    <div class="sendMsgWrap">
      <Input @send="chat.sendMsg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router, useRoute } from "vue-router";
import Input from "@/components/input.vue";
import { NavBar } from "vant";
@Options({
  components: {
    NavBar,
    Input
  }
})
export default class Contact extends Vue {
  chat = setup(() => {
    const router: Router = useRouter();
    const route = useRoute();
    const toChat = () => {
      router.push("/chat");
    };

    const sendMsg = (txt: string) => {
      // 发送消息
      console.log(txt, "text");
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
  padding: 2vw 0;
  border-top: 1px solid lightgray;
  position: absolute;
  bottom: 1rem;
}
</style>
