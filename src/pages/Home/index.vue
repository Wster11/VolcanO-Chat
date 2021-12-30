<template>
  <div class="homeWrap">
    
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { ref } from "vue";
@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  index = setup(() => {
    const store = useStore();
    let FriendList: any = ref([]);

    onMounted(() => {
      store.state.IM.connect.getRoster().then((res: any) => {
        FriendList = res.data;
      });
    });

    return {
      FriendList
    };
  });
}
</script>

<style scoped></style>
