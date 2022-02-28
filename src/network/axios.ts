import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import { showMessage } from "./status";
import { Notification } from "@douyinfe/semi-ui";

export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  transformRequest: [
    function (data) {
      // 使用 form-data 需要数据格式化
      data = qs.stringify(data);
      return data;
    },
  ],
});

// axios 实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response;
    } else {
      showMessage(response.status);
      return response;
    }
  },
  (error: any) => {
    const { response } = error;
    if (response) {
      // 发出请求，但是不在2xx的范围
      showMessage(response.status);
      return Promise.reject(response.data);
    } else {
      Notification.error({
        position: "top",
        title: "网络连接异常，请稍后再试",
      });
    }
  }
);

// axios 实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
