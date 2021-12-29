<template>
  <RouterView />
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { RouterView, useRouter, Router } from "vue-router";
import { onMounted } from "vue";
import { useStore } from "vuex";
import conn from "./initIm";

@Options({
  components: {
    RouterView
  }
})
export default class App extends Vue {
  app = setup(() => {
    const router: Router = useRouter();
    onMounted(() => {
      const store = useStore();
      store.commit("IM/setConnect", conn);
      conn.listen({
        onOpened: () => {
          // 登录成功跳转
          router.push("/");
        }
      });
    });
    return {};
  });
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #f5efef;
}
</style>
