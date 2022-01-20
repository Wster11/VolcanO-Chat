<template>
  <div class="contactWrap">
    <NavBar title="Contact" />
    <CellGroup inset>
      <Field
        v-model="contact.userStr"
        rows="1"
        autosize
        label="好友列表"
        type="textarea"
        center
        placeholder="好友"
      >
        <template #button>
          <Button type="primary" size="small" @click="contact.getFriendList"
            >查询好友列表</Button
          >
        </template>
      </Field>
    </CellGroup>
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
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { NavBar, Button, CellGroup, Field, Toast } from "vant";
import { useStore } from "vuex";
import { ref } from "vue";
@Options({
  components: {
    NavBar,
    Button,
    CellGroup,
    Field
  }
})
export default class Contact extends Vue {
  contact = setup(() => {
    const store = useStore();
    let userStr = ref("");
    let userID = ref("");
    let delUserID = ref("");

    const getFriendList = () => {
      store.state.IM.connect.getContacts().then((res: any) => {
        userStr.value = res.data.join("、");
      });
    };

    const addFriend = () => {
      let msg = "添加个好友吧!";
      store.state.IM.connect.addContact(userID.value, msg);
      Toast("发送好友请求成功");
    };

    const delFriend = () => {
      store.state.IM.connect.deleteContact(delUserID.value);
    };

    return {
      userStr,
      userID,
      delUserID,
      getFriendList,
      addFriend,
      delFriend
    };
  });
}
</script>

<style lang="less" scoped>
.title {
  color: #000;
  font-size: 20px;
  font-weight: bold;
}
</style>
