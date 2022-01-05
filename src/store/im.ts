import { Module } from "vuex";

const im: Module<any, any> = {
  namespaced: true,
  state: {
    connect: null,
    chat: {}
  },
  mutations: {
    setConnect(state, conn) {
      state.connect = conn;
    },
    updateChat(state, { fromId, message }) {
      if (Object.prototype.hasOwnProperty.call(state.chat, fromId)) {
        state.chat[fromId].messageList.push(message);
      } else {
        state.chat[fromId] = {
          messageList: [message]
        };
      }
    }
  }
};

export default im;
