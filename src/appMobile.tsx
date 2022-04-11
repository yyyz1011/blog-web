import "@/assets/css/layout.less";

import { BackTop, Layout } from "@douyinfe/semi-ui";
import React from "react";

import MobileContent from "@/components/mobile/mobile-content";
import MobileHeader from "@/components/mobile/mobile-header";

const { Header, Content } = Layout;

const AppMobile: React.FC = () => {
  return (
    <>
      <Layout>
        <Header className="layout-header-mobile">
          <MobileHeader />
        </Header>
        <Content>
          <MobileContent />
        </Content>
      </Layout>
      <BackTop className="article-back-top" />
    </>
  );
};

export default AppMobile;
