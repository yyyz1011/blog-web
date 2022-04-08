import * as React from "react";
import { render } from "react-dom";
import App from "@/app";
import "@/utils/i18n";
import "@/assets/css/common.less";
import { Provider } from "mobx-react";
import store from "@/store";
import { Notification } from "@douyinfe/semi-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { configure } from "mobx"; // 开启严格模式
import { QueryClient, QueryClientProvider } from "react-query";
configure({ enforceActions: "always" }); // 开启严格模式

NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
});

window.$catch = (content: string) =>
  Notification.error({
    position: "top",
    content,
  });

console.log(
  "Welcome %c Ye Zhou's %c leaf blog",
  "color:orange;font-weight:bold",
  ""
);

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById("app")
);
