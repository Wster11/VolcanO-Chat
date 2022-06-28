<template>
  <div class="contactWrap">
    <NavBar title="Contact" />
     <ContactItem
          v-for="(item, idx) in contact.userList"
          :key="item"
          :name="item"
          :isEnd="idx >= contact.userList.length - 1"
          chatType="singleChat"
        />
    <CellGroup inset>
      <Field
        v-model="contact.userID"
        center
        clearable
        label="添加好友"
        placeholder="请输入好友ID"
      >
        <template #button>
          <Button size="small" type="primary" @click="contact.addFriend"
            >添加</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="contact.delUserID"
        center
        clearable
        label="删除好友"
        placeholder="请输入好友ID"
      >
        <template #button>
          <Button size="small" type="danger" @click="contact.delFriend"
            >删除</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="contact.blockStr"
        rows="1"
        autosize
        label="黑名单列表"
        type="textarea"
        center
        placeholder="黑名单"
      >
        <template #button>
          <Button type="primary" size="small" @click="contact.getBlockList"
            >查看</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="contact.blockId"
        center
        clearable
        label="加入黑名单"
        placeholder="请输入好友ID"
      >
        <template #button>
          <Button size="small" type="primary" @click="contact.addBlock"
            >加入</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="contact.delBlockId"
        center
        clearable
        label="移除黑名单"
        placeholder="请输入好友ID"
      >
        <template #button>
          <Button size="small" type="danger" @click="contact.delBlock"
            >移除</Button
          >
        </template>
      </Field>
    </CellGroup>
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
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, Router } from "vue-router";
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
    const router: Router = useRouter();
    let timerId: number;
    let userStr = ref("");
    let userID = ref("");
    let delUserID = ref("");
    let blockStr = ref("");
    let blockId = ref("");
    let delBlockId = ref("");
    let userList = ref<string[]>([]);

    const getFriendList = () => {
      store.state.IM.connect.getContacts().then((res: any) => {
        userStr.value = res.data.join("、");
        userList.value = res?.data || [];
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
      getBlockList();
      addFriend();
      addBlock();
      delFriend();
      delBlock();
      store.state.IM.connect.blockGroup({
        groupId: "1234421"
      });
      store.state.IM.connect.getChatRoomMuted({
        chatRoomId: "8999999"
      });
      timerId = setTimeout(() => {
        router.push("/user");
      }, 5 * 1000);
    });

    onUnmounted(() => {
      clearTimeout(timerId);
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
  padding: 0 30px;
  text-align: left;
}
</style>
