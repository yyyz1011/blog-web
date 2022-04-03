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

export interface GetArticleListItem {
  aid: string;
  article_like: string;
  article_vv: string;
  atLabel: string;
  atid: string;
  content: string;
  create_time: string;
  desc: string;
  modify_time: string;
  title: string;
}
export type GetArticleListResp = GetArticleListItem[];
