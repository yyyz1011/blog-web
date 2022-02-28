import { axiosInstance, IResponse } from "./axios";

/**
 * @description axios demo
 * @params {AxiosDemoReq} params
 * @return {Promise}
 */
interface AxiosDemoReq {}
export function axiosDemo(params: AxiosDemoReq): Promise<IResponse> {
  return axiosInstance.post("user/login", params).then((res) => res.data);
}

/**
 * @description 获取qq头像
 * @param account
 * @returns
 */
export function getQQAvatar(account: string) {
  return `https://q1.qlogo.cn/g?b=qq&nk=${account}&s=100`;
}

/**
 * @description 获取随机图片
 * @returns
 */
interface FreeImgReq {
  width: number;
  height: number;
}
export function getFreeImg(params: FreeImgReq) {
  const { width, height } = params;
  return `https://picsum.photos/${width}/${height}`;
}
