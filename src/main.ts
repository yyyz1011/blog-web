import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import "@/assets/css/common.scss";

export const app = createApp(App);

app.use(router);

app.mount("#app");
