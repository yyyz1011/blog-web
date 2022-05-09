import "./index.less";

import {
  Button,
  ButtonGroup,
  Descriptions,
  List,
  Modal,
  Tag,
  Toast,
} from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import NoData from "@/components/no-data";
import Api from "@/network/api";
import { GetArticleListItem } from "@/network/apiType";

const AdminArticleList: React.FC = () => {
  const {
    data: articleList,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("article-list", async () => {
    const data = await Api.Article.getArticleList();
    return data;
  });

  useEffect(() => {
    if (isError) {
      window.$catch(error);
    }
  }, [isError]);

  function getDescriptionList(articleInfo: GetArticleListItem) {
    return [
      {
        key: "创建时间",
        value: dayjs(Number(articleInfo.create_time)).format("YYYY-MM-DD"),
      },
      {
        key: "更新时间",
        value: dayjs(Number(articleInfo.modify_time)).format("YYYY-MM-DD"),
      },
      { key: "阅读量", value: articleInfo.article_vv },
      { key: "点赞量", value: articleInfo.article_like },
      { key: "笔记简介", value: articleInfo.desc },
    ];
  }

  function handleEditArticle(articleInfo: GetArticleListItem) {
    Toast.warning("暂不支持，敬请期待");
  }

  function handleDeleteArticle(articleInfo: GetArticleListItem) {
    Modal.error({
      className: "modal-delete",
      title: `确认要删除笔记么?(不可逆)`,
      content: `笔记名：${articleInfo.title}`,
      cancelText: "错了错了，不删",
      okText: "狠心删除",
      okType: "danger",
      onOk: async () => {
        try {
          await Api.Article.delArticle({ aid: articleInfo.aid });
          refetch();
          Toast.success("删除笔记成功");
        } catch (err: any) {
          window.$catch(err.message);
        }
      },
    });
  }

  if (!articleList?.length || isLoading) {
    return (
      <div className="article-no-data">
        <NoData text="笔记正在赶来的路上~" />
      </div>
    );
  }

  return (
    <div>
      <List
        dataSource={articleList}
        renderItem={(item: GetArticleListItem, index: number) => (
          <List.Item
            main={
              <div className="article-list-main">
                <div className="article-list-main--title">
                  {index + 1}.{item.title}
                  <Tag color="white" className="tag">
                    {item.atLabel}
                  </Tag>
                </div>
                <Descriptions
                  data={getDescriptionList(item)}
                  row
                  size="small"
                />
              </div>
            }
            extra={
              <ButtonGroup theme="borderless">
                <Button onClick={() => handleEditArticle(item)}>编辑</Button>
                <Button type="danger" onClick={() => handleDeleteArticle(item)}>
                  删除
                </Button>
              </ButtonGroup>
            }
          />
        )}
      />
    </div>
  );
};

export default AdminArticleList;
