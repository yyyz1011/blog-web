import { Request } from "@/network/request";

export interface GetPictureListItem {
  title: string;
  region: string;
  pid: string;
  picture_url: string;
  desc: string;
  create_time: string;
}

export type GetPictureListResp = GetPictureListItem[];

export default class ApiPicture {
  public static Picture = {
    getPictureList: (): Promise<GetPictureListResp> => Request.get("/p/picture/list") as any
  };
}
