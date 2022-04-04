import React, { Suspense, useEffect } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import type { RouterType } from "@/routers";
import { NavRouters, Routers } from "@/routers";
import Nav from "@/components/nav";
import { Layout, BackTop, Notification, Banner } from "@douyinfe/semi-ui";
import Api from "@/network/api";
import { Token } from "@/constant/common";
import "@/assets/css/layout.less";
import NoPage from "@/views/NoPage";
import { useTranslation } from "react-i18next";
// @ts-ignore
import { currentBrowser } from "leaf-util";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const { t } = useTranslation();
  const isChrome = currentBrowser() === "Chrome";

  useEffect(() => {
    getUserToken();
  }, []);

  async function getUserToken() {
    try {
      const { token } = await Api.User.getToken();
      sessionStorage.setItem(Token, token);
    } catch (err: any) {
      Notification.error({
        content: err.message,
        position: "top",
      });
    }
  }

  return (
    <>
      <HashRouter>
        <Header className="layout-header">
          <Nav />
        </Header>
        {!isChrome && <Banner type="warning" description={t("chrome_tip")} />}
        <Content>
          <Suspense fallback={<div />}>
            <Routes>
              <Route path="*" element={<Navigate to="/404" />} />
              {[...NavRouters, ...Routers].map((item: RouterType) => (
                <Route
                  key={item.key}
                  path={item.path}
                  element={<item.component />}
                />
              ))}
              <Route path="/404" element={<NoPage />} />
            </Routes>
          </Suspense>
        </Content>
      </HashRouter>
      <BackTop className="article-back-top" />
    </>
  );
};

export default App;
