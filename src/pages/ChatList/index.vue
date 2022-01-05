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
      <User v-for="item in chat.chatList" :key="item" :name="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { NavBar, Icon, Popover } from "vant";
import User from "@/components/user.vue";

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
    const chatList = ref<Array<string>>([]);
    const showPopover = ref(false);

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
      store.state.IM.connect.getRoster().then((res: any) => {
        chatList.value = res.data;
      });
    });

    return {
      chatList,
      showPopover,
      actions,
      onSelect
    };
  });
}
</script>

<style scoped>
.userListWrap {
  padding: 3vw;
}
</style>
