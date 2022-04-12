<template>
  <div class="itemWrap" @click="user.toContact(name, chatType)">
    <div>{{ name }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router } from "vue-router";
import { CHAT_TYPE } from "@/const";

@Options({
  props: {
    name: String,
    chatType: CHAT_TYPE
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
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  cursor: pointer;
}
</style>
