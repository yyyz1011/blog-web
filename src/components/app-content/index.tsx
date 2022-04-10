import { Layout } from "@douyinfe/semi-ui";
import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Token } from "@/constant/common";
import Api from "@/network/api";
import { NavRouters, Routers, RouterType } from "@/routers";
import NoPage from "@/views/NoPage";

const { Content } = Layout;

const AppContent: React.FC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    getUserToken();
  }, []);

  async function getUserToken() {
    try {
      const { token } = await Api.User.getToken();
      sessionStorage.setItem(Token, token);
      setIsLoad(true);
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  return (
    <>
      {isLoad && (
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
      )}
    </>
  );
};

export default AppContent;
