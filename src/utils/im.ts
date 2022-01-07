import { ERROR_CODE } from "@/const/errorCode";
import websdk, { EasemobChat } from "easemob-websdk";
import conn from "../initIm";

// 发送消息
const deliverMsg = (msg: EasemobChat.MessageBody) => {
  return new Promise((resolve, reject) => {
    conn
      .send(msg)
      .then((res: any) => {
        resolve(res);
      })
      .catch((e: any) => {
        if (e.message === ERROR_CODE.notLogin) {
          console.log("未登录");
        }
        reject(e);
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

export { deliverMsg, formatImFile, createMsg };
