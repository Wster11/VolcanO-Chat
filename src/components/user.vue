<template>
  <div class="userWrap" @click="user.toContact(name, chatType)">
    <div
      class="avatar defaultAvatar"
      :style="
        user.info.avatarurl
          ? `background: url(${user.info.avatarurl});background-size: 100%`
          : ''
      "
    ></div>
    <span>{{
      chatType === user.CHAT_TYPE.groupChat ? `Group: ${name}` : name
    }}</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router } from "vue-router";
import { CHAT_TYPE } from "@/const";
import { onMounted, getCurrentInstance, reactive } from "vue";
import { useStore } from "vuex";
import { UserOption, InfoRes } from "@/types/user";

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
    const info = reactive<UserOption>({});
    const conn = store.state.IM.connect;
    const toContact = (id: string, type: CHAT_TYPE) => {
      router.push(`/chat/to/${type}/${id}`);
    };

    const getUserInfo = () => {
      if (context?.props.chatType === CHAT_TYPE.singleChat) {
        conn.fetchUserInfoById(context?.props.name).then((res: InfoRes) => {
          Object.assign(info, res.data[context?.props.name as string]);
        });
      }
    };

    onMounted(() => {
      getUserInfo();
    });

    return {
      toContact,
      CHAT_TYPE,
      info
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
  border-radius: 50%;
  margin-right: 2vw;
}
.defaultAvatar {
  background-image: url("../assets/avatar.jpeg");
  background-size: 100%;
  background-position: center;
}
</style>
