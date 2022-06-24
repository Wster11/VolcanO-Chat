const appKey: string = localStorage.getItem("appkey") || "easemob-demo#easeim";

const GROUP_SESSION = "conference"; // 会话列表群组标识

enum MSG_TYPE {
  read = "read",
  delivery = "delivery",
  channel = "channel",
  txt = "txt",
  cmd = "cmd",
  custom = "custom",
  loc = "loc",
  img = "img",
  audio = "audio",
  file = "file",
  video = "video"
}

enum CHAT_TYPE {
  singleChat = "singleChat",
  groupChat = "groupChat",
  chatRoom = "chatRoom"
}

enum MSG_OPT_TYPE {
  recall = "撤回"
  // read = "已读"
}

export { appKey, GROUP_SESSION, MSG_TYPE, CHAT_TYPE, MSG_OPT_TYPE };
