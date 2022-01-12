<template>
  <div class="chatDetailWrap">
    <NavBar :title="chat.fromId" left-arrow @click-left="chat.toChat" />
    <div id="msgWrap">
      <div
        v-for="item in chat.chatInfo[chat.fromId]?.messageList"
        :key="item.id"
      >
        <MsgLeft
          v-if="item.from"
          :msg="item"
          :timestamp="item.time"
          @previewImg="chat.previewImage"
        />
        <MsgRight
          v-else
          :msg="item"
          :timestamp="item.time"
          @previewImg="chat.previewImage"
        />
      </div>
    </div>
    <div class="sendMsgWrap">
      <div class="richMsgWrap">
        <Popover v-model:show="chat.emojiShow" placement="top-start">
          <Grid
            square
            clickable
            :border="false"
            column-num="10"
            style="width: 240px; padding-bottom: 5px"
          >
            <GridItem
              v-for="i in chat.emojiLs"
              :key="i"
              @click="chat.sendEmoji(i.url)"
            >
              <img class="emoji" :src="i.url" @click="chat.selectEmoji" />
            </GridItem>
          </Grid>
          <template #reference>
            <Icon class="icon" size="20" name="smile-o" />
          </template>
        </Popover>
        <Uploader :after-read="chat.afterReadImg">
          <Icon class="icon" size="20" name="photo-o" />
        </Uploader>
        <Uploader accept="video/*" :after-read="chat.afterReadVideo">
          <Icon class="icon" size="20" name="video-o" />
        </Uploader>
        <Uploader :after-read="chat.afterReadAttach" accept="*">
          <Icon class="icon" size="20" name="idcard" />
        </Uploader>
        <Icon
          class="icon"
          size="20"
          name="balance-o"
          @click="chat.sendCustomMsg"
        />
        <Icon class="icon" size="20" name="replay" @click="chat.sendCmdMsg" />
      </div>
      <Input ref="ipt" @send="chat.sendMsg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { useRouter, Router, useRoute } from "vue-router";
import Input from "@/components/input.vue";
import {
  NavBar,
  Icon,
  Popover,
  Grid,
  GridItem,
  Uploader,
  ImagePreview
} from "vant";
import { useStore } from "vuex";
import { getCurrentInstance, ref } from "vue";
import { MSG_TYPE, CHAT_TYPE } from "@/const";
import MsgLeft from "@/components/messageLeft.vue";
import MsgRight from "@/components/messageRight.vue";
import emoji from "@/const/emojs";
import { scrollToBottom } from "@/utils";
import { deliverMsg, formatImFile, createMsg } from "@/utils/im";
import { EasemobChat } from "easemob-websdk";

@Options({
  components: {
    NavBar,
    Input,
    Icon,
    MsgLeft,
    MsgRight,
    Popover,
    Grid,
    GridItem,
    Uploader
  }
})
export default class Contact extends Vue {
  chat = setup(() => {
    const router: Router = useRouter();
    const route = useRoute();
    const store = useStore();
    const conn = store.state.IM.connect;
    const instance = getCurrentInstance();
    const fromId = route.params.fromId as string;
    const emojiShow = ref(false);

    const previewImage = (url: string) => {
      // TODO: 发送接收消息时push图片url,不要每次都获取
      const imgMsgList = store.state.IM.chat[fromId]?.messageList
        .filter((item: EasemobChat.MessageBody) => {
          return item.type === MSG_TYPE.img;
        })
        .map((imgItem: any) => {
          return imgItem.url || imgItem.body.url;
        });

      ImagePreview({
        images: imgMsgList,
        startPosition: imgMsgList.findIndex((imgUrl: string) => {
          return imgUrl === url;
        })
      });
    };

    const emojiLs = Object.entries(emoji.obj).map((item) => {
      return {
        name: item[0],
        url: `/emoji/${item[1]}`
      };
    });

    const selectEmoji = () => {
      emojiShow.value = false;
    };

    const toChat = () => {
      router.push("/chat");
    };
    // 收到消息滚动到底部
    conn.addEventHandler("MESSAGE_SCROLL", {
      onTextMessage: () => {
        setTimeout(() => {
          scrollToBottom(document.getElementById("msgWrap"));
        }, 200);
      }
    });

    // 发送文本和表情消息
    const sendMsg = (txt: string) => {
      let msg = createMsg({
        chatType: CHAT_TYPE.singleChat,
        type: MSG_TYPE.txt,
        to: fromId,
        msg: txt,
        ext: { extra: "附加消息" } // 发送附加消息
      });
      store.commit("IM/updateChat", { fromId, message: msg });
      const ipt: any = instance?.refs.ipt;
      ipt.ipt.clear();
      deliverMsg(msg).then(() => {
        console.log("发送成功");
        scrollToBottom(document.getElementById("msgWrap"));
      });
    };

    // 点击表情
    const sendEmoji = (emoji: string) => {
      emojiShow.value = false;
      const ipt: any = instance?.refs.ipt;
      const emojiStr = `<img class="emojiItem" src="${emoji}"/>`;
      ipt.ipt.mergeTxt(emojiStr);
    };

    const afterReadImg = (file: any) => {
      // 直接发送图片URL(用户自行上传图片到自己的服务器)
      // Web端需要在 WebIMConfig.js中 设置 useOwnUploadFun: true
      // const imgMsg = createMsg({
      //   chatType: CHAT_TYPE.singleChat,
      //   type: MSG_TYPE.img,
      //   url: "https://www.easemob.com/statics/common/images/logo.png?20211109",
      //   to: fromId
      // });

      const imgMsg = createMsg({
        chatType: CHAT_TYPE.singleChat,
        type: MSG_TYPE.img,
        to: fromId,
        file: formatImFile(file.file) as any
      });

      // 发送图片消息
      deliverMsg(imgMsg).then((res) => {
        console.log(imgMsg, "imgMsg");
        store.commit("IM/updateChat", { fromId, message: imgMsg });
        setTimeout(() => {
          scrollToBottom(document.getElementById("msgWrap"));
        }, 200);
        console.log(res, "发送图片消息成功");
      });
    };

    const afterReadAttach = (file: any) => {
      // 发送附件消息
      const attachMsg = createMsg({
        chatType: CHAT_TYPE.singleChat,
        type: MSG_TYPE.file,
        to: fromId,
        filename: file.file.name,
        file: formatImFile(file.file) as any
      });

      deliverMsg(attachMsg).then((res) => {
        console.log(attachMsg, "attachMsg");
        store.commit("IM/updateChat", { fromId, message: attachMsg });
        setTimeout(() => {
          scrollToBottom(document.getElementById("msgWrap"));
        }, 200);
        console.log(res, "发送附件消息成功");
      });
    };

    const afterReadVideo = (file: any) => {
      // 发送视频消息
      const videoMsg = createMsg({
        chatType: CHAT_TYPE.singleChat,
        type: MSG_TYPE.video,
        to: fromId,
        filename: file.file.name,
        file: formatImFile(file.file) as any,
        file_length: 0,
        length: 0
      });

      deliverMsg(videoMsg).then((res) => {
        console.log(videoMsg, "attachMsg");
        store.commit("IM/updateChat", { fromId, message: videoMsg });
        setTimeout(() => {
          scrollToBottom(document.getElementById("msgWrap"));
        }, 200);
        console.log(res, "发送视频消息成功");
      });
    };

    // 发送自定义消息
    const sendCustomMsg = () => {
      const customMsg = createMsg({
        chatType: CHAT_TYPE.singleChat,
        type: MSG_TYPE.custom,
        to: fromId,
        customEvent: "RED_PACKAGE",
        customExts: {
          amount: 1000
        }
      });

      deliverMsg(customMsg).then((res) => {
        store.commit("IM/updateChat", { fromId, message: customMsg });
        setTimeout(() => {
          scrollToBottom(document.getElementById("msgWrap"));
        }, 200);
        console.log(res, "发送自定义消息成功");
      });
    };

    // 发送命令消息
    const sendCmdMsg = () => {
      const cmdMsg = createMsg({
        chatType: CHAT_TYPE.singleChat,
        type: MSG_TYPE.cmd,
        to: fromId,
        action: "refresh"
      });

      deliverMsg(cmdMsg).then((res) => {
        store.commit("IM/updateChat", { fromId, message: cmdMsg });
        setTimeout(() => {
          scrollToBottom(document.getElementById("msgWrap"));
        }, 200);
        console.log(res, "发送命令消息成功");
      });
    };

    return {
      fromId: fromId,
      emojiShow,
      emojiLs: emojiLs,
      chatInfo: store.state.IM.chat,
      toChat,
      sendMsg,
      selectEmoji,
      sendEmoji,
      afterReadImg,
      afterReadAttach,
      previewImage,
      afterReadVideo,
      sendCustomMsg,
      sendCmdMsg
    };
  });
}
</script>

<style scoped>
.sendMsgWrap {
  width: 100%;
  padding: 2vw;
  border-top: 1px solid lightgray;
  position: absolute;
  /* bottom: 1vw; */
}
.richMsgWrap {
  padding: 2vw;
  text-align: left;
}
.chatDetailWrap {
  height: 100%;
}
#msgWrap {
  padding: 10px;
  height: calc(100% - 100px - 15vw);
  overflow: scroll;
}
.icon {
  margin-right: 2vw;
}

.emoji {
  width: 20px;
  height: 20px;
}
</style>
