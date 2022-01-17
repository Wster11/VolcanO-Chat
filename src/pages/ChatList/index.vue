<template>
  <div class="chatWrap">
    <NavBar title="Message">
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
            <Icon name="plus" size="20" color="seagreen" />
          </template>
        </Popover>
      </template>
    </NavBar>
    <div class="userListWrap">
      <User
        v-for="item in chat.chatList"
        :key="item"
        :name="chat.formatSessionListTo(item.meta.from, item.meta.to)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { NavBar, Icon, Popover } from "vant";
import User from "@/components/user.vue";
import { EasemobChat } from "easemob-websdk";
import { formatSessionListTo } from "@/utils/im";

interface Actions {
  text: string;
}

@Options({
  components: {
    User,
    NavBar,
    Icon,
    Popover
  }
})
export default class Home extends Vue {
  chat = setup(() => {
    const store = useStore();
    const chatList = ref<Array<EasemobChat.SessionInfo>>([]);
    const showPopover = ref(false);

    interface ChannelInfo {
      channel_infos: EasemobChat.SessionInfo[];
    }

    // 通过 actions 属性来定义菜单选项
    const actions: Array<Actions> = [
      { text: "添加好友" },
      { text: "申请入群" },
      { text: "创建群组" }
    ];
    const onSelect = (action: Actions) => {
      console.log(action.text);
    };

    onMounted(() => {
      store.state.IM.connect
        .getSessionList()
        .then((res: EasemobChat.AsyncResult<ChannelInfo>) => {
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
  padding: 3vw;
}
</style>
