<template>
  <div class="userWrap" @click="user.toContact(name, chatType)">
    <div
      :class="
        chatType === user.CHAT_TYPE.groupChat
          ? 'avatar defaultGroupAvatar'
          : 'avatar defaultAvatar'
      "
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
import { EasemobChat } from "agora-chat-sdk/Easemob-chat";
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router } from "vue-router";
import { CHAT_TYPE } from "@/const";
import { onMounted, getCurrentInstance, reactive } from "vue";
import { AllState } from "../store";
import { useStore } from "vuex";

@Options({
  props: {
    name: String,
    chatType: CHAT_TYPE
  }
})
export default class Home extends Vue {
  user = setup(() => {
    const store = useStore<AllState>();
    const router: Router = useRouter();
    const context = getCurrentInstance();
    const info = reactive<EasemobChat.UpdateOwnUserInfoParams>({});
    const conn = store.state.IM.connect;
    const toContact = (id: string, type: CHAT_TYPE) => {
      router.push(`/chat/to/${type}/${id}`);
    };

    const getUserInfo = () => {
      if (context?.props.chatType === CHAT_TYPE.singleChat) {
        conn.fetchUserInfoById(context?.props.name as string).then((res) => {
          Object.assign(info, res.data?.[context?.props.name as string], {
            success: true
          });
        });
      } else {
        Object.assign(info, {
          success: true
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
  background-image: url("../assets/avatar.png");
  background-size: 100%;
  background-position: center;
}

.defaultGroupAvatar {
  background-image: url("../assets/group.png");
  background-size: 100%;
  background-position: center;
}
</style>
