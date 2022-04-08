import {
  AddArticleLikeReq,
  AddArticleLikeResp,
  AddArticleVvReq,
  AddArticleVvResp,
  CreateMessageReq,
  CreateMessageResp,
  GetArticleListReq,
  GetArticleListResp,
  GetMessageListResp,
  GetPictureListResp,
  GetTokenResp,
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
  };

  public static Picture = {
    getPictureList: (): Promise<GetPictureListResp> =>
      Request.get("/p/picture/list") as any,
  };

  public static Message = {
    createMessage: (params: CreateMessageReq): Promise<CreateMessageResp> =>
      Request.post("/m/create", params) as any,
    getMessageList: (): Promise<GetMessageListResp> =>
      Request.get("/m/list") as any,
  };
}
