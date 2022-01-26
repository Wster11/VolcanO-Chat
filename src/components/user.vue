<template>
  <div class="userWrap" @click="user.toContact(name, chatType)">
    <div class="avatar"></div>
    <span>{{
      chatType === user.CHAT_TYPE.groupChat ? `Group: ${name}` : name
    }}</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router } from "vue-router";
import { CHAT_TYPE } from "@/const";
import { onMounted, getCurrentInstance } from "vue";
import { useStore } from "vuex";
@Options({
  props: {
    name: String,
    chatType: CHAT_TYPE
  }
})
export default class Home extends Vue {
  user = setup(() => {
    const store = useStore();
    const router: Router = useRouter();
    const context = getCurrentInstance();
    const toContact = (id: string, type: CHAT_TYPE) => {
      router.push(`/chat/to/${type}/${id}`);
    };

    const getUserInfo = () => {
      if (context?.props.chatType === CHAT_TYPE.singleChat) {
        store.state.IM.connect
          .fetchUserInfoById(context?.props.name)
          .then((res: any) => {
            console.log(res, "res");
          });
      }
    };

    onMounted(() => {
      getUserInfo()
    });

    return {
      toContact,
      CHAT_TYPE
    };
  });
}
</script>

<style scoped>
.userWrap {
  display: flex;
  align-items: center;
  margin-bottom: 3vw;
}
.avatar {
  width: 14vw;
  height: 14vw;
  background-image: url("../assets/avatar.jpeg");
  background-size: 100%;
  background-position: center;
  border-radius: 50%;
  margin-right: 2vw;
}
</style>
