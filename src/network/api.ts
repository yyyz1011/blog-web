import {
  AddArticleLikeReq,
  AddArticleLikeResp,
  AddArticleVvReq,
  AddArticleVvResp,
  CreateArticleReq,
  CreateArticleTypeReq,
  CreateMessageReq,
  CreateMessageResp,
  CreatePictureReq,
  DelArticleReq,
  DelPictureReq,
  GetArticleListReq,
  GetArticleListResp,
  GetMessageListResp,
  GetPictureListResp,
  GetTokenResp,
  UpdateArticleReq,
  UpdatePictureReq,
} from "./apiType";
import { Request } from "./request";

export default class Api {
  public static Common = {
    upload: (params: any) => Request.post("/c/upload", params),
  };

  public static User = {
    getToken: (): Promise<GetTokenResp> => Request.get("/u/user/info") as any,
  };

  public static Article = {
    getArticleTypeList: () => Request.get("/at/article/type/list") as any,
    getArticleList: (params?: GetArticleListReq): Promise<GetArticleListResp> =>
      Request.get("/a/article/list", params) as any,
    addArticleLike: (params: AddArticleLikeReq): Promise<AddArticleLikeResp> =>
      Request.get("/a/article/like", params) as any,
    addArticleVv: (params: AddArticleVvReq): Promise<AddArticleVvResp> =>
      Request.get("/a/article/vv", params) as any,
    delArticle: (params: DelArticleReq) => Request.post("/a/del", params),
    createArticle: (params: CreateArticleReq) =>
      Request.post("/a/create", params),
    updateArticle: (params: UpdateArticleReq) =>
      Request.post("/a/update", params),
    createArticleType: (params: CreateArticleTypeReq) =>
      Request.post("/at/create", params),
  };

  public static Picture = {
    getPictureList: (): Promise<GetPictureListResp> =>
      Request.get("/p/picture/list") as any,
    delPicture: (params: DelPictureReq) => Request.post("/p/del", params),
    createPicture: (params: CreatePictureReq) =>
      Request.post("/p/create", params),
    updatePicture: (params: UpdatePictureReq) =>
      Request.post("/p/update", params),
  };

  public static Message = {
    createMessage: (params: CreateMessageReq): Promise<CreateMessageResp> =>
      Request.post("/m/create", params) as any,
    getMessageList: (): Promise<GetMessageListResp> =>
      Request.get("/m/list") as any,
  };
}
