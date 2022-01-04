<template>
  <div class="chatWrap">
    <User v-for="item in chat.chatList" :key="item" :name="item" />
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import User from "@/components/user.vue";
@Options({
  components: {
    User
  }
})
export default class Home extends Vue {
  chat = setup(() => {
    const store = useStore();
    let chatList = ref<Array<string>>([]);

    onMounted(() => {
      store.state.IM.connect.getRoster().then((res: any) => {
        chatList.value = res.data;
      });
    });

    return {
      chatList
    };
  });
}
</script>

<style scoped></style>
