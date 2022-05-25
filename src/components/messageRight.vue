<template>
  <div class="messageItemWrap">
    <Popover
      v-model:show="rightMsg.isShowMenu"
      :actions="rightMsg.actions"
      @select="rightMsg.onSelect"
      placement="top-end"
      theme="dark"
      trigger="manual"
    >
      <template #reference>
        <div class="user">{{ rightMsg.uid }}</div>
        <div
          class="messageItem"
          @touchstart="rightMsg.showMenu"
          @touchend="rightMsg.end"
        >
          <div v-if="msg.type === rightMsg.msgType.txt" v-html="msg.msg"></div>
          <div v-else-if="msg.type === rightMsg.msgType.img">
            <img
              class="imgMsg"
              :src="msg.thumb"
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
              <video
                :id="msg.id"
                :src="msg.url"
                controls
                @error="rightMsg.onVideoError(msg.id, msg.url)"
              />
            </div>
          </div>
          <div v-else-if="msg.type === rightMsg.msgType.custom">
            <div>
              自定义消息 {{ msg.customEvent
              }}{{ JSON.stringify(msg.customExts) }}
            </div>
          </div>
          <div v-else-if="msg.type === rightMsg.msgType.cmd">
            <div>cmd消息 action: {{ msg.action }}</div>
          </div>
        </div>
      </template>
    </Popover>

    <div class="time">
      {{ rightMsg.formatTime(timestamp, "YYYY-MM-DD hh:mm:ss") }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { formatTime } from "@/utils";
import { MSG_TYPE, MSG_OPT_TYPE } from "@/const";
import { ref } from "vue";
import { Icon, Popover, PopoverAction } from "vant";
@Options({
  props: {
    msg: Object,
    timestamp: Number
  },
  components: {
    Icon,
    Popover
  },
  emits: ["previewImg", "recallMessage"]
})
export default class MessageRight extends Vue {
  rightMsg = setup(() => {
    let intervalId: number;

    const previewImg = (url: string) => {
      this.$emit("previewImg", url);
    };
    const downloadAttach = (url: string) => {
      window.open(url);
    };
    const uid = localStorage.getItem("uid");

    const times = ref(0); // 加载视频重试次数

    const isShowMenu = ref(false);

    const actions: PopoverAction[] = [{ text: MSG_OPT_TYPE.recall }];

    const showMenu = () => {
      clearInterval(intervalId);
      intervalId = setTimeout(() => {
        isShowMenu.value = true;
      }, 300);
    };

    const end = () => {
      clearInterval(intervalId);
    };

    const onSelect = (action: PopoverAction) => {
      if (action.text === MSG_OPT_TYPE.recall) {
        this.$emit("recallMessage");
      }
    };

    const onVideoError = (id: string, src: string) => {
      let timerId: number = 0;
      timerId && clearInterval(timerId);
      // 加载失败进行重试
      if (times.value < 5) {
        times.value++;
        timerId = setTimeout(() => {
          let video = document.getElementById(id) as HTMLVideoElement;
          video.setAttribute("src", src);
        }, 1000);
      }
    };

    return {
      actions,
      msgType: MSG_TYPE,
      isShowMenu,
      uid,
      formatTime,
      onSelect,
      previewImg,
      showMenu,
      end,
      downloadAttach,
      onVideoError
    };
  });
}
</script>

<style lang="less" scoped>
.user {
  margin-bottom: 10px;
}
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
  // min-width: 100px;
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
