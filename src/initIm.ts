import websdk from "agora-chat-sdk";
import { appKey } from "@/const/index";

const conn = new websdk.connection({
  appKey,
  isHttpDNS: true,
  delivery: true
  // useOwnUploadFun: true
});

export default conn;
