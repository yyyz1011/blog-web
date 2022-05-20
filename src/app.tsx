import "@/assets/css/layout.less";

import { BackTop, Banner, Layout } from "@douyinfe/semi-ui";
// @ts-ignore
import { currentBrowser } from "leaf-util";
import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";

import AppContent from "@/components/app-content";
import Nav from "@/components/nav";

import cutUrlParam from "./utils/cutUrlParam";
// import { getGithubToken } from "./network";

const { Header, Footer } = Layout;

const App: React.FC = () => {
  const isChrome = currentBrowser() === "Chrome";

  document.body.setAttribute("theme-mode", "dark");

  useEffect(() => {
    const { code = "" } = cutUrlParam(window.location.href);
    if (code !== "") {
      // getGithubUserInfo(code);
    }
  }, []);

  // async function getGithubUserInfo(code:string) {
  //   const data = await getGithubToken(code);
  // }

  return (
    <>
      <HashRouter>
        <Header className="layout-header">
          <Nav />
        </Header>
        {!isChrome && (
          <Banner
            type="warning"
            description="检验到当前浏览器并不是谷歌浏览器，推荐使用谷歌浏览器哈~"
          />
        )}
        <AppContent></AppContent>
      </HashRouter>
      <Footer className="layout-footer">浙ICP备2022011110号-1</Footer>
      <BackTop className="article-back-top" />
    </>
  );
};

export default App;
