import "@/assets/css/common.less";
import "nprogress/nprogress.css";

import { Notification } from "@douyinfe/semi-ui";
// @ts-ignore
import { isPC } from "leaf-util";
import NProgress from "nprogress";
import * as React from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "@/app";
import AppMobile from "@/appMobile";

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

function currentDom() {
  return (
    <QueryClientProvider client={queryClient}>
      {isPC() ? <App /> : <AppMobile />}
    </QueryClientProvider>
  );
}

render(currentDom(), document.getElementById("app"));
