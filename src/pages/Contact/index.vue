<template>
  <div>
    <NavBar title="Contact" :fixed="true" />
    <div class="contactWrap">
      <div class="title">我的好友</div>
      <div class="itemsWrap">
        <ContactItem
          v-for="(item, idx) in contact.userList"
          :key="item"
          :name="item"
          :isEnd="idx >= contact.userList.length - 1"
          chatType="singleChat"
        />
      </div>
      <div class="title">我的群组</div>
      <div class="itemsWrap">
        <ContactItem
          v-for="(item, idx) in contact.groupList"
          :key="item.groupid"
          :name="item.groupid"
          :isEnd="idx >= contact.groupList.length - 1"
          chatType="groupChat"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { NavBar, Button, Field } from "vant";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import ContactItem from "./contactItem.vue";
import { AllState } from "@/store";
import { EasemobChat } from "agora-chat-sdk/Easemob-chat";

@Options({
  components: {
    NavBar,
    Button,
    Field,
    ContactItem
  }
})
export default class Contact extends Vue {
  contact = setup(() => {
    const store = useStore<AllState>();
    let userList = ref<string[]>([]);
    let groupList = ref<EasemobChat.BaseGroupInfo[]>([]);

    const getFriendList = () => {
      store.state.IM.connect.getContacts().then((res) => {
        userList.value = res?.data || [];
      });
    };

    const getJoinedGroupList = () => {
      store.state.IM.connect
        .getJoinedGroups({
          pageNum: 1,
          pageSize: 500
        })
        .then((res) => {
          groupList.value = res.data || [];
        });
    };

    onMounted(() => {
      getFriendList();
      getJoinedGroupList();
    });
    return {
      userList,
      groupList,
      getFriendList
    };
  });
}
</script>

<style lang="less" scoped>
.title {
  color: #000;
  font-size: 13px;
  padding: 4px 12px;
  background: #eeeeee;
}
.contactWrap {
  padding: 46px 0;
  text-align: left;
}
.itemsWrap {
  padding: 0 3vw;
}
</style>
