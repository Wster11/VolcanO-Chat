import { createStore } from "vuex";
import IM, { IMState } from "./im";

export interface AllState {
  'IM': IMState
}

export default createStore({
  modules: {
    IM
  }
});
