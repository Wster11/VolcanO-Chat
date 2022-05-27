<template>
  <div class="chatWrap">
    <NavBar title="Message" :fixed="true">
      <template #right>
        <Popover
          :overlay="true"
          :overlay-style="{ background: 'rgba(0,0,0,0.4)' }"
          placement="bottom-end"
          v-model:show="chat.showPopover"
          :actions="chat.actions"
          @select="chat.onSelect"
        >
          <template #reference>
            <Icon name="plus" size="20" color="#1296db" />
          </template>
        </Popover>
      </template>
    </NavBar>
    <div class="userListWrap">
      <User
        v-for="item in chat.chatList"
        :key="item"
        :chatType="item.chatType"
        :name="
          chat.formatSessionListTo(item.meta.from, item.meta.to, item.chatType)
        "
      />
      <Empty v-if="!chat.chatList.length" description="会话列表为空" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { NavBar, Icon, Popover, Empty } from "vant";
import User from "@/components/user.vue";
import { EasemobChat } from "easemob-websdk";
import { useRouter, Router } from "vue-router";
import { formatSessionListTo } from "@/utils/im";
import { CHAT_TYPE, GROUP_SESSION } from "@/const";
import { AllState } from "@/store";

interface Actions {
  text: string;
}

@Options({
  components: {
    User,
    NavBar,
    Icon,
    Popover,
    Empty
  }
})
export default class Home extends Vue {
  chat = setup(() => {
    const store = useStore<AllState>();
    const chatList = ref<Array<EasemobChat.SessionInfo>>([]);
    const showPopover = ref(false);
    const route: Router = useRouter();

    // 通过 actions 属性来定义菜单选项
    const actions: Array<Actions> = [{ text: "添加好友" }, { text: "设置" }];
    const onSelect = (action: Actions) => {
      console.log(action);
      route.push("/setting");
    };

    onMounted(() => {
      store.state.IM.connect.getSessionList().then((res) => {
        res.data?.channel_infos.forEach((item) => {
          item.chatType =
            item.meta.to.indexOf(GROUP_SESSION) > -1
              ? CHAT_TYPE.groupChat
              : CHAT_TYPE.singleChat;
        });
        chatList.value = res.data?.channel_infos || [];
      });
    });

    return {
      chatList,
      showPopover,
      actions,
      onSelect,
      formatSessionListTo
    };
  });
}
</script>

<style scoped>
.userListWrap {
  padding: 50px 3vw;
}
</style>
