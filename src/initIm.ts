import websdk, { EasemobChat } from "easemob-websdk";
import { appKey } from "@/const/index";

const conn: EasemobChat.Connection = new websdk.connection({
  appKey,
  isHttpDNS: true,
  delivery: true
  // useOwnUploadFun: true
});

export default conn;
