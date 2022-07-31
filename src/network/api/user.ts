import { Request } from "@/network/request";

export interface GetTokenResp {
  token: string;
}

export default class ApiUser {
  public static User = {
    getToken: (): Promise<GetTokenResp> => Request.get("/u/user/info") as any
  };
}
