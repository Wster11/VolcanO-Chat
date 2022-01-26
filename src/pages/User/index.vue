<template>
  <div class="contactWrap">
    <NavBar title="User" />
    <CellGroup inset>
      <Field
        disabled
        v-model="user.userId"
        rows="1"
        autosize
        label="用户ID"
        type="input"
        center
        placeholder="userId"
      >
      </Field>
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
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { NavBar, Button, CellGroup, Field, Toast } from "vant";
import { useStore } from "vuex";
import { onMounted, reactive } from "vue";

interface UserOption {
  nickname?: string;
  avatarurl?: string;
  mail?: string;
  phone?: string | number;
  gender?: string;
  birth?: string;
  sign?: string;
  ext?: string;
}

interface InfoRes {
  data: {
    [key: string]: UserOption;
  };
}

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
</style>
