import {Message} from "@arco-design/web-vue";
import axios, {AxiosRequestConfig, Method} from "axios";
import NProgress from "nprogress";
import {Token} from "@/constants/common";

export const baseUrl = "http://www.yeyezhou.com/api";

// 定义接口
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: any;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const {CancelToken} = axios;

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
	for (const key in pending) {
		const item: number = +key;
		if (pending.hasOwnProperty(key)) {
			const list: PendingType = pending[key];
			// 当前请求在数组中存在时执行函数体
			if (
				list.url === config.url &&
				list.method === config.method &&
				JSON.stringify(list.params) === JSON.stringify(config.params) &&
				JSON.stringify(list.data) === JSON.stringify(config.data)
			) {
				list.cancel("操作太频繁，请稍后再试");
				pending.splice(item, 1);
			}
		}
	}
};

// 实例化请求
const instance = axios.create({
	headers: {
		"Content-Type": "application/json;charset=UTF-8",
		"Access-Control-Allow-Origin-Type": "*",
	},
	baseURL: baseUrl,
	timeout: 5 * 1000,
	withCredentials: false,
});

// 请求拦截器
instance.interceptors.request.use(
	(config) => {
		NProgress.start();
		removePending(config);
		config.cancelToken = new CancelToken((c) => {
			pending.push({
				url: config.url,
				method: config.method,
				params: config.params,
				data: config.data,
				cancel: c,
			});
		});
		// 登录流程控制中，根据本地是否存在token判断用户的登录情况
		// 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
		// 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
		const token = sessionStorage.getItem(Token);
		if (token) {
			config.headers = {
				token,
			};
		}

		return config;
	},
	(err) => {
		Message.error({
			duration: 3,
			position: "top",
			content: `[network error]${err.data.error.message}`,
		});
		return Promise.reject(err.data.error.message);
	}
);

// 相应拦截器
instance.interceptors.response.use(
	(config) => {
		NProgress.done();
		removePending(config.config);
		const realConfig = config.data;
		if (realConfig.code === 200) {
			return Promise.resolve(realConfig.data);
		} else {
			Message.error({
				duration: 3,
				position: "top",
				content: `[network error][${realConfig.code}] ${realConfig.message}`,
			});
			return Promise.reject(realConfig);
		}
	},
	(err) => {
		const {response} = err;
		if (response) {
			const {config} = err;
			const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

			if (config && RETRY_COUNT) {
				// 设置用于跟踪重试计数的变量
				config.__retryCount = config.__retryCount || 0;
				// 检查是否已经把重试的总数用完
				if (config.__retryCount >= RETRY_COUNT) {
					return Promise.reject(response || {message: err.message});
				}
				// 增加重试计数
				config.__retryCount++;
				// 创造新的Promise来处理指数后退
				const backoff = new Promise<void>((resolve) => {
					setTimeout(() => {
						resolve();
					}, RETRY_DELAY || 1);
				});
				// instance重试请求的Promise
				return backoff.then(() => {
					return instance(config);
				});
			}
			return Promise.reject(response);
		}
	}
);

export default instance;
