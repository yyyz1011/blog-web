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
