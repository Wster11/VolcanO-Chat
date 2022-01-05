<template>
  <div class="messageItemWrap">
    <div class="messageItem">
      <div>12313123</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    msg: String,
    time: String
  }
})
export default class Contact extends Vue {}
</script>

<style scoped>
.messageItemWrap {
  text-align: left;
  margin-bottom: 10px;
}
.messageItem {
  font-size: 14px;
  display: inline-block;
  background: #f3f3f2;
  border-radius: 10px;
  padding: 7px;
  min-width: 100px;
  max-width: 80vw;
}
</style>
