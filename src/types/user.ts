interface UserOption {
  nickname?: string;
  avatarurl?: string;
  mail?: string;
  phone?: string | number;
  gender?: string;
  birth?: string;
  sign?: string;
  ext?: string;
}

interface InfoRes {
  data: {
    [key: string]: UserOption;
  };
}

export { UserOption, InfoRes };
