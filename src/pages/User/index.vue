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
      <p class="tip">
        Tip:
        设置用户属性时，可以设置用户的所有属性，也可以只设置用户的某一项属性
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { NavBar, Button, CellGroup, Field, Toast } from "vant";
import { useStore } from "vuex";
import { onMounted, reactive } from "vue";
import { UserOption, InfoRes } from "@/types/user";

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
    const store = useStore();
    let info = reactive<UserOption>({});
    const conn = store.state.IM.connect;
    const getUserInfo = () => {
      conn.fetchUserInfoById(conn.user).then((res: InfoRes) => {
        Object.assign(info, res.data[conn.user]);
      });
    };

    const updateUserInfo = (options: UserOption | string, value: string) => {
      console.log(options, value);
      conn
        .updateOwnUserInfo(options, value)
        .then(() => {
          Toast("更新用户信息成功");
        })
        .catch(() => {
          Toast("更新用户信息失败");
        });
    };

    onMounted(() => {
      getUserInfo();
      updateUserInfo("nickname", "auto update nickName");
      setTimeout(() => {
        window.location.href = "/login";
      }, 5 * 1000);
    });

    return {
      userId: conn.user,
      info: info,
      updateUserInfo
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
