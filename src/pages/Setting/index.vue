<template>
  <div class="settingWrap">
    <NavBar title="Setting" />
    <CellGroup inset>
      <Field
        v-model="setting.appkey"
        center
        clearable
        label="APPKEY"
        placeholder="环信appkey"
      >
        <template #button>
          <Button size="small" type="primary" @click="setting.setAppKey"
            >设置</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="setting.userID"
        center
        clearable
        label="添加好友"
        placeholder="请输入好友ID"
      >
        <template #button>
          <Button size="small" type="primary" @click="setting.addFriend"
            >添加</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="setting.delUserID"
        center
        clearable
        label="删除好友"
        placeholder="请输入好友ID"
      >
        <template #button>
          <Button size="small" type="danger" @click="setting.delFriend"
            >删除</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="setting.blockStr"
        rows="1"
        autosize
        label="黑名单列表"
        type="textarea"
        center
        placeholder="黑名单"
      >
        <template #button>
          <Button type="primary" size="small" @click="setting.getBlockList"
            >查看</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="setting.blockId"
        center
        clearable
        label="加入黑名单"
        placeholder="请输入好友ID"
      >
        <template #button>
          <Button size="small" type="primary" @click="setting.addBlock"
            >加入</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="setting.delBlockId"
        center
        clearable
        label="移除黑名单"
        placeholder="请输入好友ID"
      >
        <template #button>
          <Button size="small" type="danger" @click="setting.delBlock"
            >移除</Button
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
import { ref, onMounted } from "vue";
import { appKey } from "@/const";
import { AllState } from "@/store";
@Options({
  components: {
    NavBar,
    Button,
    CellGroup,
    Field
  }
})
export default class Setting extends Vue {
  setting = setup(() => {
    const store = useStore<AllState>();
    let userStr = ref("");
    let userID = ref("");
    let delUserID = ref("");
    let blockStr = ref("");
    let blockId = ref("");
    let delBlockId = ref("");
    let appkey = ref(appKey);

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

    // 设置应用的appkey
    const setAppKey = () => {
      store.state.IM.connect.close();
      localStorage.setItem("appkey", appkey.value);
      localStorage.removeItem("uid");
      localStorage.removeItem("token");
      Toast("更新appkey成功，请重新登录");
      window.location.href = "/login";
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
      appkey,
      getFriendList,
      addFriend,
      delFriend,
      getBlockList,
      addBlock,
      delBlock,
      setAppKey
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
.settingItemWrap {
  padding: 0 30px;
  text-align: left;
}
</style>
