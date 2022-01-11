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
import { Form, Field, CellGroup, Button } from "vant";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

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

    let loading = ref<boolean>(false);

    const login = (opt: any) => {
      // 登录服务器
      loading.value = true;
      store.state.IM.connect.open(opt);
    };

    const onSubmit = (params: LoginFormParams): void => {
      login({
        ...params,
        success: () => {
          loading.value = false;
        },
        error: () => {
          loading.value = false;
        }
      });
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
      onSubmit,
      loading
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
