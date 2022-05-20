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

export interface GetArticleListReq {
  aid?: string;
  atid?: string;
}

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

export interface AddArticleLikeReq {
  aid: string;
}

export interface AddArticleLikeResp {
  aid: string;
}

export interface AddArticleVvReq {
  aid: string;
}

export interface AddArticleVvResp {
  aid: string;
}

export interface DelPictureReq {
  pid: string;
}

export interface DelArticleReq {
  aid: string;
}

export interface CreateArticleReq {
  title: string;
  desc: string;
  atid: string;
  content: string;
}

export interface UpdateArticleReq {
  aid: string;
  title: string;
  desc: string;
  atid: string;
  content: string;
  create_time: string;
}

export interface CreateArticleTypeReq {
  label: string;
}

export interface CreatePictureReq {
  title: string;
  region: string;
  desc: string;
  create_time: string;
  picture_url: string;
}

export interface UpdatePictureReq {
  pid: string;
  title: string;
  region: string;
  desc: string;
  create_time: string;
  picture_url: string;
}
