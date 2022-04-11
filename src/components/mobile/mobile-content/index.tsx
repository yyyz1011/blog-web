import "./index.less";

import { TabPane, Tabs } from "@douyinfe/semi-ui";
import React, { useEffect, useState } from "react";

import MobileArticleCard from "@/components/mobile/mobile-article-card";
import MobilePictureCard from "@/components/mobile/mobile-picture-card";
import NoData from "@/components/no-data";
import { Token } from "@/constant/common";
import Api from "@/network/api";

const MobileContent: React.FC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [contentList, setContentList] = useState([]);
  const [currentTabKey, setCurrentTabKey] = useState("1");

  useEffect(() => {
    getUserToken();
  }, []);

  useEffect(() => {
    if (!isLoad) return;
    getContentList();
  }, [isLoad]);

  async function getUserToken() {
    try {
      const { token } = await Api.User.getToken();
      sessionStorage.setItem(Token, token);
      setIsLoad(true);
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  async function getContentList() {
    try {
      const [articleList = [], imgList = []] = await Promise.all([
        Api.Article.getArticleList(),
        Api.Picture.getPictureList(),
      ]);
      const data = [...articleList, ...imgList].sort(
        (a, b) => Number(a.create_time) - Number(b.create_time)
      );
      setContentList(data);
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  function getCurrentList() {
    return (
      <>
        {contentList
          .filter((item) => {
            if (currentTabKey === "1") {
              return true;
            }
            if (currentTabKey === "2") {
              return item?.aid;
            }
            if (currentTabKey === "3") {
              return item?.pid;
            }
          })
          .map((item: any) => {
            if (item?.aid)
              return <MobileArticleCard key={item.aid} info={item} />;
            if (item?.pid)
              return <MobilePictureCard key={item.pid} info={item} />;
            return null;
          })}
        <div className="mobile-content--bottom">已经到底啦~</div>
      </>
    );
  }

  if (!contentList.length || !isLoad) {
    return (
      <div className="mobile-content">
        <div className="mobile-content--no-data">
          <NoData text="正在加载中，等一下哈~" />
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-content">
      <Tabs
        activeKey={currentTabKey}
        type="button"
        onTabClick={(key) => setCurrentTabKey(key)}
      >
        <TabPane tab="全部" itemKey="1"></TabPane>
        <TabPane tab="笔记" itemKey="2"></TabPane>
        <TabPane tab="图库" itemKey="3"></TabPane>
      </Tabs>
      {getCurrentList()}
    </div>
  );
};

export default MobileContent;
