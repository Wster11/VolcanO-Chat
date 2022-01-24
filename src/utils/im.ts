import { ERROR_CODE } from "@/const/errorCode";
import websdk from "agora-chat-sdk";
import { EasemobChat } from "../easemob";
import conn from "../initIm";
import { Toast } from "vant";
import { appKey, GROUP_SESSION, CHAT_TYPE } from "@/const/index";

// 发送消息
const deliverMsg = (msg: EasemobChat.MessageBody) => {
  return new Promise((resolve, reject) => {
    conn
      .send(msg)
      .then((res) => {
        resolve(res);
        msg.id = res.serverMsgId;
      })
      .catch((e: any) => {
        if (e.message === ERROR_CODE.notLogin) {
          console.log("未登录");
        }
        reject(e);
        console.log(e, "发送消息失败");
      });
  });
};

// 撤回消息

const recallMessage = (options: any) => {
  return new Promise((resolve, reject) => {
    conn
      .recallMessage(options)
      .then((res) => {
        resolve(res);
      })
      .catch((e: any) => {
        if (e.message === ERROR_CODE.notLogin) {
          console.log("未登录");
        } else if (e.message === ERROR_CODE.recallTimeout) {
          Toast("已超过可撤回时间");
        }
        reject(e);
        console.log(e, "撤回消息失败");
      });
  });
};

// 创建消息
const createMsg = (opt: EasemobChat.CreateMsgType) => {
  return websdk.message.create(opt);
};

// 格式化file文件
const formatImFile = (file: File) => {
  return {
    filename: file.name,
    filetype: file.type.split("/")[1],
    data: file
  };
};

// 格式化会话列表to, 获取用户ID
const formatSessionListTo = (from: string, to: string, chatType: CHAT_TYPE) => {
  const uid = window.localStorage.getItem("uid");
  const isGroupChat = chatType === CHAT_TYPE.groupChat;
  const fromUid = from.split(`${appKey}_`)[1].split("@easemob.com")[0];
  let toUid = "";
  if (isGroupChat) {
    // 如果是群组
    toUid = to.split(`${appKey}_`)[1].split(`@${GROUP_SESSION}.easemob.com`)[0];
  } else {
    toUid = to.split(`${appKey}_`)[1].split("@easemob.com")[0];
  }
  if (isGroupChat) {
    return toUid;
  }
  return uid === fromUid ? toUid : fromUid;
};

// 获取store fromId
const getMessageFromId = (message: any) => {
  const { to, from, chatType } = message;
  return chatType === CHAT_TYPE.groupChat ? to : from;
};

export {
  deliverMsg,
  formatImFile,
  createMsg,
  recallMessage,
  formatSessionListTo,
  getMessageFromId
};
