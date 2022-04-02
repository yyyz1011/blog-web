import { Request } from "./request";
import { GetTokenResp, GetPictureListResp } from "./apiType";

export default class Api {
  public static Common = {
    upload: (params: any) => Request.post("/c/upload", params),
  };

  public static User = {
    getToken: (): Promise<GetTokenResp> => Request.get("/u/user/info") as any,
  };

  public static Article = {
    getArticleTypeList: () => Request.get("/at/article/type/list"),
    // getArticleList: (params) => Request.get("/a/article/list", params),
  };

  public static Picture = {
    getPictureList: (): Promise<GetPictureListResp> =>
      Request.get("/p/picture/list") as any,
  };
}
