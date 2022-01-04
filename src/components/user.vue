<template>
  <div class="userWrap" @click="user.toContact(name)">
    <div class="avatar"></div>
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router } from "vue-router";

@Options({
  props: {
    name: String
  }
})
export default class Home extends Vue {
  user = setup(() => {
    const router: Router = useRouter();
    const toContact = (id: string) => {
      router.push(`/chat/to/${id}`);
    };
    return {
      toContact
    };
  });
}
</script>

<style scoped>
.userWrap {
  display: flex;
  align-items: center;
  margin-bottom: 3vw;
}
.avatar {
  width: 14vw;
  height: 14vw;
  background-image: url("../assets/avatar.jpeg");
  background-size: 100%;
  background-position: center;
  border-radius: 50%;
  margin-right: 2vw;
}
</style>
