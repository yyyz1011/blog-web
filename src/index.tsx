import * as React from "react";
import { render } from "react-dom";
import App from "@/app";
import "@/utils/i18n";
import "@/assets/css/common.less";
import { Provider } from "mobx-react";
import store from "@/store";
import { Notification } from "@douyinfe/semi-ui";
import { configure } from "mobx"; // 开启严格模式
configure({ enforceActions: "always" }); // 开启严格模式

window.$catch = (content: string) =>
  Notification.error({
    position: "top",
    content,
  });

const leafBlogInfo =
  "  __                  ___   __       __                 \n" +
  "  [  |               .' ..] [  |     [  |                \n" +
  "   | | .---.  ,--.  _| |_    | |.--.  | |  .--.   .--./) \n" +
  "   | |/ /__\\`'_ :'-| |-'   | '/'` | |/ .'` / /'`; \n" +
  "   | || __.,// | |, | |     |  __/ || || __. | ._// \n" +
  "  [___]'.__.''-;__/[___]   [__;.__.'[___]'.__.' .',__`  \n" +
  "                                                ( ( __)) ";

console.info(leafBlogInfo);
console.log(
  "Welcome %c Ye Zhou's %c leaf blog",
  "color:orange;font-weight:bold",
  ""
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
