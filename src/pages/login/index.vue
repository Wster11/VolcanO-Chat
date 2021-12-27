<template>
  <div class="loginWrap">
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
        <Button round block type="primary" native-type="submit"> 提交 </Button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Form, Field, CellGroup, Button } from "vant";
import { onMounted, ref } from "vue";
import websdk from "easemob-websdk";
import { appKey } from "../../const/index";

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
    let conn: any;
    const init = () => {
      conn = new websdk.connection({
        appKey,
        isHttpDNS: true
      });
    };

    const login = (opt: any) => {
      conn.open(opt);
    };

    const username: any = ref("");
    const password: any = ref("");

    const onSubmit: any = (values: any) => {
      console.log(values, "bale");
      login(values);
    };

    onMounted(() => {
      init();
    });
    return {
      username,
      password,
      onSubmit
    };
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
