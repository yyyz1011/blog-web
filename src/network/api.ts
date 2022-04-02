import { Request } from "./request";
import { GetTokenResp, GetPictureListResp } from "./apiType";

export default class Api {
  // public static Common = {
  //   upload: (params: any) => Request.post("/c/upload", params),
  // };

  public static User = {
    getToken: (): Promise<GetTokenResp> => Request.get("/u/user/info") as any,
  };

  // public static Article = {
  //   getArticleTypeList: () => Request.get("/at/article/type/list"),
  //   getArticleList: (params: GetArticleListReq) =>
  //     Request.get("/a/article/list", params),
  //   createArticle: (params: CreateArticleReq) =>
  //     Request.post("/a/create", params),
  //   updateArticle: (params: UpdateArticleReq) =>
  //     Request.post("/a/update", params),
  //   delArticle: (params: DelArticleReq) => Request.post("/a/del", params),
  //   createArticleType: (params: CreateArticleTypeReq) =>
  //     Request.post("/at/create", params),
  // };

  public static Picture = {
    // createPicture: (params: CreatePictureReq) =>
    //   Request.post("/p/create", params),
    // updatePicture: (params: UpdatePictureReq) =>
    //   Request.post("/p/update", params),
    // delPicture: (params: DelPictureReq) => Request.post("/p/del", params),
    getPictureList: (): Promise<GetPictureListResp> =>
      Request.get("/p/picture/list") as any,
  };
}
