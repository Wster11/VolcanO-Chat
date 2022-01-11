<template>
  <div class="messageItemWrap">
    <div class="messageItem">
      <div v-if="msg.type === rightMsg.msgType.txt" v-html="msg.msg"></div>
      <div v-else-if="msg.type === rightMsg.msgType.img">
        <img
          class="imgMsg"
          :src="msg.body.url"
          @click="rightMsg.previewImg(msg.body.url)"
        />
      </div>
    </div>
    <div class="time">{{ rightMsg.formatTime(timestamp, "hh:mm:ss") }}</div>
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
export default class MessageRight extends Vue {
  rightMsg = setup(() => {
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
  text-align: right;
  margin-bottom: 10px;
}
.messageItem {
  text-align: left;
  font-size: 14px;
  word-break: break-all;
  display: inline-block;
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
  max-width: 200px;
}
</style>
