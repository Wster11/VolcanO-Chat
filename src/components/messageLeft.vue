<template>
  <div class="messageItemWrap">
    <div class="user">{{ msg.from }}</div>
    <div class="messageItem">
      <div v-if="msg.type === leftMsg.msgType.txt" v-html="msg.msg"></div>
      <div v-else-if="msg.type === leftMsg.msgType.img">
        <img
          class="imgMsg"
          :src="msg.url"
          @click="leftMsg.previewImg(msg.url)"
        />
      </div>
      <div v-else-if="msg.type === leftMsg.msgType.file">
        <div class="fileMsg" @click="leftMsg.downloadAttach(msg.url)">
          {{ msg.filename }}<Icon class="icon" size="18" name="down" />
        </div>
      </div>
      <div v-else-if="msg.type === leftMsg.msgType.video">
        <div class="videoMsg">
          <video :src="msg.url" controls />
        </div>
      </div>
      <div v-else-if="msg.type === leftMsg.msgType.custom">
        <div>
          自定义消息 {{ msg.customEvent }}{{ JSON.stringify(msg.customExts) }}
        </div>
      </div>
      <div v-else-if="msg.type === leftMsg.msgType.cmd">
        <div>cmd消息 action: {{ msg.action }}</div>
      </div>
    </div>
    <div class="time">
      {{ leftMsg.formatTime(timestamp, "YYYY-MM-DD hh:mm:ss") }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { formatTime } from "@/utils";
import { MSG_TYPE } from "@/const";
import { Icon } from "vant";

@Options({
  props: {
    msg: Object,
    timestamp: Number
  },
  components: {
    Icon
  },
  emits: ["previewImg"]
})
export default class MessageLeft extends Vue {
  leftMsg = setup(() => {
    const previewImg = (url: string) => {
      this.$emit("previewImg", url);
    };
    const downloadAttach = (url: string) => {
      window.open(url);
    };
    return {
      formatTime,
      msgType: MSG_TYPE,
      previewImg,
      downloadAttach
    };
  });
}
</script>

<style lang="less" scoped>
.user {
  margin-bottom: 10px;
}
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
  // min-width: 100px;
  max-width: 80vw;
}
.time {
  font-size: 12px;
  color: lightgray;
}
.imgMsg {
  max-width: 100%;
}
.fileMsg {
  padding: 5px;
  background: #fff;
}
.icon {
  vertical-align: middle;
  margin-left: 10px;
  color: seagreen;
}
.videoMsg {
  video {
    width: 200px;
  }
}
</style>
