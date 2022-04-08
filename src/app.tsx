import "@/assets/css/layout.less";

import { BackTop, Banner, Layout, Notification } from "@douyinfe/semi-ui";
// @ts-ignore
import { currentBrowser } from "leaf-util";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Nav from "@/components/nav";
import { Token } from "@/constant/common";
import Api from "@/network/api";
import { NavRouters, Routers, RouterType } from "@/routers";
import NoPage from "@/views/NoPage";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const { t } = useTranslation();
  const isChrome = currentBrowser() === "Chrome";

  useEffect(() => {
    getUserToken();
  }, []);

  async function getUserToken() {
    try {
      const { token } = await Api.User.getToken();
      sessionStorage.setItem(Token, token);
      setIsLoad(true);
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
        {isLoad ? 
          <Content>
            <Suspense fallback={<div />}>
              <Routes>
                <Route path="*" element={<Navigate to="/404" />} />
                {[...NavRouters, ...Routers].map((item: RouterType) => 
                  <Route
                    key={item.key}
                    path={item.path}
                    element={<item.component />}
                  />
                )}
                <Route path="/404" element={<NoPage />} />
              </Routes>
            </Suspense>
          </Content>
         : null}
      </HashRouter>
      <BackTop className="article-back-top" />
    </>
  );
};

export default App;
