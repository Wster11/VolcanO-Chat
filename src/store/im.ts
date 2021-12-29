import { Module } from "vuex";

const im: Module<any, any> = {
  namespaced: true,
  state: {
    connect: null
  },
  mutations: {
    setConnect(state, conn) {
      state.connect = conn;
    }
  }
};

export default im;
