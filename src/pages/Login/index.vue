<template>
  <div class="loginWrap">
    <div class="wel">WELCOME</div>
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
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Form, Field, CellGroup, Button, Toast } from "vant";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
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
    const route = useRoute();
    const router = useRouter();

    let loading = ref<boolean>(false);

    const login = (opt: any) => {
      // 登录服务器
      loading.value = true;
      store.state.IM.connect
        .open(opt)
        .then(() => {
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
    onMounted(() => {
      console.log(route.query.id, "route");
      const id = route.query.id;
      // 暂时自动登录
      login({
        user: id,
        pwd: id
      });
    });

    return {
      username,
      password,
      loading,
      onSubmit
    };
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.loginWrap {
  overflow: hidden;
  background: seagreen;
  height: 100%;
  .wel {
    margin-top: 20px;
    font-size: 28px;
    color: #fff;
    margin-bottom: 70px;
  }
}
</style>
