<template>
  <div class="homeWrap">
    <RouterView />
    <Tabbar route>
      <TabbarItem replace to="/chat" icon="chat-o">聊天</TabbarItem>
      <TabbarItem replace to="/contact" icon="friends-o"> 联系人 </TabbarItem>
      <TabbarItem replace to="/user" icon="user-o">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RouterView } from "vue-router";
import { Tabbar, TabbarItem } from "vant";

@Options({
  components: {
    RouterView,
    Tabbar,
    TabbarItem
  }
})
export default class Home extends Vue {}
</script>

<style scoped></style>
