import websdk from "agora-chat-sdk";
import { appKey } from "@/const/index";

const conn = new websdk.connection({
  appKey,
  delivery: true,
  url: `${window.location.protocol}//im-api-v2-hsb.easemob.com/ws`,
  apiUrl: `${window.location.protocol}//a1-hsb.easemob.com`,
  isHttpDNS: false
  // useOwnUploadFun: true
});

export default conn;
