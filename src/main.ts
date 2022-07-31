import {createApp} from "vue";
import App from "./App.vue";
import router from "./routers";
import "@/assets/css/common.scss";
import "@arco-design/web-vue/es/message/style/css.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {Message} from "@arco-design/web-vue";

NProgress.configure({
	easing: "ease",
	speed: 500,
	showSpinner: false,
});

document.body.setAttribute("arco-theme", "dark");

export const app = createApp(App);
app.config.globalProperties.$catch = Message.error;
app.config.globalProperties.$success = Message.success;

app.use(router);

app.mount("#app");
