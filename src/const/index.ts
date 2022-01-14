const appKey: string = "1161210719091872#demo";

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
}

export { appKey, MSG_TYPE, CHAT_TYPE, MSG_OPT_TYPE };
