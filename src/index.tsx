import * as React from "react";
import { render } from "react-dom";
import App from "@/app";
import "@/utils/i18n";
import "@/assets/css/common.less";

const leafBlogInfo =
  "  __                  ___   __       __                 \n" +
  "  [  |               .' ..] [  |     [  |                \n" +
  "   | | .---.  ,--.  _| |_    | |.--.  | |  .--.   .--./) \n" +
  "   | |/ /__\\`'_\ :'-| |-'   | '/'`\ \| |/ .'`\ \/ /'`\; \n" +
  "   | || \__.,// | |, | |     |  \__/ || || \__. |\ \._// \n" +
  "  [___]'.__.'\'-;__/[___]   [__;.__.'[___]'.__.' .',__`  \n" +
  "                                                ( ( __)) ";

console.info(leafBlogInfo);
console.log("Welcome %c Ye Zhou's %c leaf blog","color:orange;font-weight:bold","")

render(<App />, document.getElementById("app"));
