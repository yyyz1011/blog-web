import "@/assets/css/layout.less";

import { BackTop, Banner, Layout } from "@douyinfe/semi-ui";
// @ts-ignore
import { currentBrowser } from "leaf-util";
import React from "react";
import { useTranslation } from "react-i18next";
import { HashRouter } from "react-router-dom";

import AppContent from "@/components/app-content";
import Nav from "@/components/nav";

const { Header } = Layout;

const App: React.FC = () => {
  const { t } = useTranslation();
  const isChrome = currentBrowser() === "Chrome";

  return (
    <>
      <HashRouter>
        <Header className="layout-header">
          <Nav />
        </Header>
        {!isChrome && <Banner type="warning" description={t("chrome_tip")} />}
        <AppContent></AppContent>
      </HashRouter>
      <BackTop className="article-back-top" />
    </>
  );
};

export default App;
