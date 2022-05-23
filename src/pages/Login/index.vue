<template>
  <div class="loginWrap">
    <div class="wel">VolcanO</div>
    <Form @submit="login.onSubmit">
      <CellGroup inset>
        <Field
          v-model="login.username"
          name="user"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <Field
          v-model="login.password"
          type="password"
          name="pwd"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </CellGroup>
      <div style="margin: 16px">
        <Button
          :loading="login.loading"
          round
          block
          type="primary"
          native-type="submit"
        >
          登录
        </Button>
      </div>
    </Form>
    <div class="toRegister" @click="login.toRegister">没有账号？去注册</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Form, Field, CellGroup, Button, Toast } from "vant";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ERROR_CODE } from "@/const/errorCode";
import { EasemobChat } from "easemob-websdk";

interface LoginFormParams {
  user: string;
  pwd: string;
  success?: () => void;
  error?: () => void;
}

@Options({
  props: {
    msg: String
  },
  components: {
    Form,
    Field,
    CellGroup,
    Button
  }
})
export default class Login extends Vue {
  login = setup(() => {
    const store = useStore();
    const username = ref<string>("");
    const password = ref<string>("");
    const router = useRouter();

    let loading = ref<boolean>(false);

    const login = (opt: any) => {
      // 登录服务器
      loading.value = true;
      store.state.IM.connect
        .open(opt)
        .then((res: EasemobChat.LoginResult) => {
          window.localStorage.setItem("uid", username.value);
          window.localStorage.setItem("token", res.accessToken);
          router.push("/chat");
        })
        .catch((e: EasemobChat.ErrorEvent) => {
          if (e.message === ERROR_CODE.loginFailed) {
            Toast("用户名或密码错误");
          }
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const onSubmit = (params: LoginFormParams): void => {
      login(params);
    };

    const toRegister = (): void => {
      router.push('/register')
    };

    return {
      username,
      password,
      loading,
      toRegister,
      onSubmit
    };
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.loginWrap {
  overflow: hidden;
  background-image: url("../../assets/bg.png");
  height: 100%;
  background-size: cover;
  background-position: center center;
  .wel {
    margin-top: 20px;
    font-size: 28px;
    color: #fff;
    margin-bottom: 70px;
  }
  .toRegister {
    margin: 0 20px;
    text-align: right;
    color: #fff;
    cursor: pointer;
    &:hover {
      color: #4187f2;
    }
  }
}
</style>
