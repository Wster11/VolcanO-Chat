<template>
  <div class="contactWrap">
    <NavBar title="User" />
    <br />
    <CellGroup inset>
      <img class="avatar" :src="user.info.avatarurl" />
      <p>id: {{ user.userId }}</p>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="user.info.nickname"
        rows="1"
        autosize
        label="用户昵称"
        type="input"
        center
        placeholder="用户昵称"
      >
        <template #button>
          <Button
            type="primary"
            size="small"
            @click="user.updateUserInfo('nickname', user.info.nickname)"
            >更新</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="user.info.avatarurl"
        rows="1"
        autosize
        label="用户头像"
        type="input"
        center
        placeholder="请输入头像的url地址"
      >
        <template #button>
          <Button
            type="primary"
            size="small"
            @click="user.updateUserInfo('avatarurl', user.info.avatarurl)"
            >更新</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="user.info.mail"
        rows="1"
        autosize
        label="邮箱"
        type="input"
        center
        placeholder="邮箱"
      >
        <template #button>
          <Button
            type="primary"
            size="small"
            @click="user.updateUserInfo('mail', user.info.mail)"
            >更新</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="user.info.phone"
        rows="1"
        autosize
        label="手机号"
        type="input"
        center
        placeholder="手机号"
      >
        <template #button>
          <Button
            type="primary"
            size="small"
            @click="user.updateUserInfo('phone', user.info.phone)"
            >更新</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="user.info.gender"
        rows="1"
        autosize
        label="性别"
        type="input"
        center
        placeholder="性别"
      >
        <template #button>
          <Button
            type="primary"
            size="small"
            @click="user.updateUserInfo('gender', user.info.gender)"
            >更新</Button
          >
        </template>
      </Field>
    </CellGroup>
    <CellGroup inset>
      <Field
        v-model="user.info.birth"
        rows="1"
        autosize
        label="生日"
        type="input"
        center
        placeholder="生日"
      >
        <template #button>
          <Button
            type="primary"
            size="small"
            @click="user.updateUserInfo('birth', user.info.birth)"
            >更新</Button
          >
        </template>
      </Field>
    </CellGroup>
    <br />
    <div style="padding: 0 16px">
      <Button
        type="primary"
        size="small"
        block
        @click="user.updateUserInfo(user.info)"
        >保存</Button
      >
      <br />
      <Button type="default" size="small" @click="user.logout" block
        >退出登录</Button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { EasemobChat } from "agora-chat-sdk/Easemob-chat";
import { Options, Vue, setup } from "vue-class-component";
import { NavBar, Button, CellGroup, Field, Toast } from "vant";
import { useStore } from "vuex";
import { onMounted, reactive } from "vue";
import { AllState } from "../../store";
import router from "@/router";


@Options({
  components: {
    NavBar,
    Button,
    CellGroup,
    Field
  }
})

export default class User extends Vue {

  user = setup(() => {
    const store = useStore<AllState>();
    let info = reactive<EasemobChat.UpdateOwnUserInfoParams>({});
    const conn = store.state.IM.connect;
    const getUserInfo = () => {
      conn.fetchUserInfoById(conn.user).then((res) => {
        Object.assign(info, res.data?.[conn.user]);
      });
    };

    const updateUserInfo = (
      options: EasemobChat.UpdateOwnUserInfoParams,
      value: string
    ) => {
      conn
        .updateOwnUserInfo(options, value)
        .then(() => {
          Toast("更新用户信息成功");
        })
        .catch(() => {
          Toast("更新用户信息失败");
        });
    };

    const logout = () => {
      conn.close();
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("uid");
      router.push("/login");
    };

    onMounted(() => {
      getUserInfo();
    });

    return {
      userId: conn.user,
      info: info,
      updateUserInfo,
      logout
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
.avatar {
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
}
.tip {
  font-size: 14px;
}
</style>
