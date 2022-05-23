import { Module } from "vuex";
import { EasemobChat } from "easemob-websdk";

interface ChatMap {
  [key: string]: any;
}
export interface IMState {
  connect: EasemobChat.Connection;
  chat: ChatMap;
}

const im: Module<IMState, IMState> = {
  namespaced: true,
  state: {
    connect: {} as EasemobChat.Connection,
    chat: {}
  },
  mutations: {
    setConnect(state, conn) {
      state.connect = conn;
    },
    pushMessage(state, { fromId, message }) {
      if (Object.prototype.hasOwnProperty.call(state.chat, fromId)) {
        state.chat[fromId].messageList.push(message);
      } else {
        state.chat[fromId] = {
          messageList: [message]
        };
      }
    },
    deleteMessage(state, { fromId, id }) {
      if (state.chat[fromId]) {
        const idx = state.chat[fromId].messageList.findIndex(
          (item: EasemobChat.MessageBody) => {
            return item.id === id;
          }
        );
        if (idx > -1) {
          state.chat[fromId].messageList.splice(idx, 1);
        }
      }
    }
  }
};

export default im;
