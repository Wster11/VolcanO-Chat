<template>
  <div class="itemWrap" @click="user.toContact(name, chatType)">
    <User :chatType="chatType" :name="name" />
    <div v-if="!isEnd" class="divider"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router } from "vue-router";
import { CHAT_TYPE } from "@/const";
import User from "@/components/user.vue";
@Options({
  props: {
    name: "",
    chatType: CHAT_TYPE,
    isEnd: false
  },
  components: {
    User
  }
})
export default class Home extends Vue {
  user = setup(() => {
    const router: Router = useRouter();
    const toContact = (id: string, type: CHAT_TYPE) => {
      router.push(`/chat/to/${type}/${id}`);
    };
    return {
      toContact,
      CHAT_TYPE
    };
  });
}
</script>

<style scoped>
.itemWrap {
  padding-top: 3vw;
  font-size: 16px;
  cursor: pointer;
}
.divider {
  width: calc(100% - 14vw);
  float: right;
  height: 0.8px;
  background: #eee;
  margin-top: -15px;
}
</style>