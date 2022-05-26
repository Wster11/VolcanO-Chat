<template>
  <div class="contactWrap">
    <NavBar title="Contact" :fixed="true"/>
    <div class="contactItemWrap">
      <span class="title">好友列表</span>
      <br />
      <ContactItem
        v-for="item in contact.userStr.split('、')"
        :key="item"
        :name="item"
        chatType="singleChat"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { NavBar, Button, CellGroup, Field, Toast } from "vant";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import ContactItem from "./contactItem.vue";
@Options({
  components: {
    NavBar,
    Button,
    CellGroup,
    Field,
    ContactItem
  }
})
export default class Contact extends Vue {
  contact = setup(() => {
    const store = useStore();
    let userStr = ref("");
    let userID = ref("");
    let delUserID = ref("");
    let blockStr = ref("");
    let blockId = ref("");
    let delBlockId = ref("");
    const getFriendList = () => {
      store.state.IM.connect.getContacts().then((res: any) => {
        userStr.value = res.data.join("、");
      });
    };
    const getBlockList = () => {
      store.state.IM.connect.getBlacklist().then((res: any) => {
        blockStr.value = res.data.join("、");
      });
    };
    const addFriend = () => {
      let msg = "添加个好友吧!";
      store.state.IM.connect.addContact(userID.value, msg);
      Toast("发送好友请求成功");
    };
    const addBlock = () => {
      store.state.IM.connect.addToBlackList({
        name: blockId.value
      });
      Toast(`将${blockId.value}加入黑名单成功`);
    };
    const delFriend = () => {
      store.state.IM.connect.deleteContact(delUserID.value);
    };
    const delBlock = () => {
      store.state.IM.connect.removeFromBlackList({
        name: delBlockId.value
      });
    };
    onMounted(() => {
      getFriendList();
    });
    return {
      userStr,
      userID,
      delUserID,
      blockStr,
      blockId,
      delBlockId,
      getFriendList,
      addFriend,
      delFriend,
      getBlockList,
      addBlock,
      delBlock
    };
  });
}
</script>

<style lang="less" scoped>
.title {
  color: #000;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.contactItemWrap {
  padding: 50px 30px;
  text-align: left;
}
</style>