<template>
  <div class="messageItemWrap">
    <div class="messageItem">
      <div v-if="msg.type === rightMsg.msgType.txt" v-html="msg.msg"></div>
      <div v-else-if="msg.type === rightMsg.msgType.img">
        <img
          class="imgMsg"
          :src="msg.url"
          @click="rightMsg.previewImg(msg.url)"
        />
      </div>
      <div v-else-if="msg.type === rightMsg.msgType.file">
        <div class="fileMsg" @click="rightMsg.downloadAttach(msg.url)">
          {{ msg.filename }}<Icon class="icon" size="18" name="down" />
        </div>
      </div>
      <div v-else-if="msg.type === rightMsg.msgType.video">
        <div class="videoMsg">
          <video :src="msg.url" controls />
        </div>
      </div>
      <div v-else-if="msg.type === rightMsg.msgType.custom">
        <div>
          自定义消息 {{ msg.customEvent }}{{ JSON.stringify(msg.customExts) }}
        </div>
      </div>
      <div v-else-if="msg.type === rightMsg.msgType.cmd">
        <div>cmd消息 action: {{ msg.action }}</div>
      </div>
    </div>
    <div class="time">{{ rightMsg.formatTime(timestamp, "hh:mm:ss") }}</div>
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
export default class MessageRight extends Vue {
  rightMsg = setup(() => {
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
  cursor: pointer;
}
.time {
  font-size: 12px;
  color: lightgray;
}

.imgMsg {
  max-width: 200px;
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
