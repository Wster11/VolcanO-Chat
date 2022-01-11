<template>
  <div class="messageItemWrap">
    <div class="messageItem">
      <div v-if="msg.type === leftMsg.msgType.txt" v-html="msg.msg"></div>
      <div v-else-if="msg.type === leftMsg.msgType.img">
        <img
          class="imgMsg"
          :src="msg.url"
          @click="leftMsg.previewImg(msg.url)"
        />
      </div>
    </div>
    <div class="time">{{ leftMsg.formatTime(timestamp, "hh:mm:ss") }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { formatTime } from "@/utils";
import { MSG_TYPE } from "@/const";

@Options({
  props: {
    msg: Object,
    timestamp: Number
  },
  emits: ["previewImg"]
})
export default class MessageLeft extends Vue {
  leftMsg = setup(() => {
    const previewImg = (url: string) => {
      this.$emit("previewImg", url);
    };
    return {
      formatTime,
      msgType: MSG_TYPE,
      previewImg
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
.imgMsg {
  max-width: 100%;
}
</style>
