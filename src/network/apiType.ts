export interface GetTokenResp {
  token: string;
}

export interface GetPictureListItem {
  title: string;
  region: string;
  pid: string;
  picture_url: string;
  desc: string;
  create_time: string;
}
export type GetPictureListResp = GetPictureListItem[];

export interface CreateMessageReq {
  account: string;
  content: string;
  nick_name: string;
}

export interface CreateMessageResp {
  mid: string;
}

export interface GetMessageListItem {
  mid: string;
  account: string;
  nick_name: string;
  content: string;
  create_time: string;
}
export type GetMessageListResp = GetMessageListItem[];
