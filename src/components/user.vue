<template>
  <div class="userWrap">
    <div class="avatar"></div>
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: String
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.userWrap {
  display: flex;
  align-items: center;
  margin-bottom: 2vw;
}
.avatar {
  width: 18vw;
  height: 18vw;
  background: #abcdef;
  border-radius: 50%;
  margin-right: 2vw;
}
</style>
