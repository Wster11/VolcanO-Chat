<template>
  <div class="registerWrap">
    <div class="wel">VolcanO</div>
    <Form @submit="register.onSubmit">
      <CellGroup inset>
        <Field
          v-model="register.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <Field
          v-model="register.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </CellGroup>
      <div style="margin: 16px">
        <Button
          :loading="register.loading"
          round
          block
          type="primary"
          native-type="submit"
        >
          立即注册
        </Button>
      </div>
    </Form>
    <div class="toLogin" @click="register.toLogin">已有账号？去登录</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Form, Field, CellGroup, Button, Toast } from "vant";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ERROR_CODE } from "@/const/errorCode";
import { AllState } from "../../store";

interface RegisterFormParams {
  username: string;
  password: string;
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
export default class Register extends Vue {
  register = setup(() => {
    const store = useStore<AllState>();
    const username = ref<string>("");
    const password = ref<string>("");
    const router = useRouter();

    let loading = ref<boolean>(false);

    const register = (opt: RegisterFormParams) => {
      // 注册新用户
      loading.value = true;
      store.state.IM.connect
        .registerUser(opt)
        .then(() => {
          Toast("注册成功");
          router.push("/login");
        })
        .catch((e) => {
          console.log(e, "eeee");
          let errInfo: any = {};
          if (e.data) {
            errInfo = JSON.parse(e.data);
          }
          if (errInfo.error === ERROR_CODE.registerUnique) {
            Toast("用户已存在");
          } else {
            Toast("注册失败");
          }
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const onSubmit = (params: RegisterFormParams): void => {
      register(params);
    };

    const toLogin = (): void => {
      router.push("/login");
    };

    return {
      username,
      password,
      loading,
      toLogin,
      onSubmit
    };
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.registerWrap {
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
  .toLogin {
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
