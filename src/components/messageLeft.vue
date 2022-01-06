<template>
  <div class="messageItemWrap">
    <div class="messageItem">
      <div>{{ msg }}</div>
    </div>
    <div class="time">{{ leftMsg.formatTime(timestamp, "hh:mm:ss") }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { formatTime } from "@/utils";
@Options({
  props: {
    msg: String,
    timestamp: Number
  }
})
export default class Contact extends Vue {
  leftMsg = setup(() => {
    return {
      formatTime
    };
  });
}
</script>

<style scoped>
.messageItemWrap {
  text-align: left;
  margin-bottom: 10px;
}
.messageItem {
  font-size: 14px;
  display: inline-block;
  word-break: break-all;
  background: #f3f3f2;
  border-radius: 10px;
  padding: 7px;
  min-width: 100px;
  max-width: 80vw;
}
.time {
  font-size: 12px;
  color: lightgray;
}
</style>
