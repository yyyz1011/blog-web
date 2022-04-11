import "./index.less";
import "md-editor-rt/lib/style.css";

import { IconChevronDown } from "@douyinfe/semi-icons";
import { Avatar, Button, Card, Collapsible, Tag } from "@douyinfe/semi-ui";
import Editor from "md-editor-rt";
import React, { useState } from "react";

import { QQAccount } from "@/constant";
import { getQQAvatar } from "@/network";
import Api from "@/network/api";
import { GetArticleListItem } from "@/network/apiType";

interface MobileArticleCardProps {
  info: GetArticleListItem;
}
const MobileArticleCard: React.FC<MobileArticleCardProps> = (
  props: MobileArticleCardProps
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const articleInfo = props.info;

  async function handleShowMoreArticle() {
    setIsOpen(true);
    try {
      await Api.Article.addArticleVv({ aid: articleInfo.aid });
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  return (
    <Card
      className="article-card"
      title={
        <Card.Meta
          title={
            <div className="article-item">
              <div className="article-item--title">{articleInfo.title}</div>
              <Tag className="article-item--label" color="violet">
                {articleInfo.atLabel}
              </Tag>
            </div>
          }
          description={articleInfo.desc}
          avatar={
            <Avatar size="small" src={getQQAvatar(QQAccount)} alt="leaf-blog" />
          }
        />
      }
    >
      <div
        onClick={() => {
          if (!isOpen) return;
          setIsOpen(false);
        }}
      >
        <Collapsible
          className="article-collapsible"
          isOpen={isOpen}
          collapseHeight={200}
        >
          <Editor previewOnly modelValue={articleInfo?.content ?? ""} />
        </Collapsible>
        {isOpen ? null : (
          <div className="article-show-more">
            <Button
              onClick={handleShowMoreArticle}
              theme="borderless"
              type="primary"
            >
              点击展示更多
              <IconChevronDown className="show-more-icon" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MobileArticleCard;
