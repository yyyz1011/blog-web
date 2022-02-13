import React from "react";
import { Card, Tag } from "@douyinfe/semi-ui";
import "./index.less";
import { TagColor } from "@douyinfe/semi-ui/lib/es/tag";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface ArticleTag {
  type: string;
  color: string;
}
interface IProps {
  info: {
    id: string;
    title: string;
    desc: string;
    type: Array<ArticleTag>;
    modify_time: string;
  };
}

const ArticleCard: React.FC<IProps> = (props: IProps) => {
  const { title, desc, type, modify_time: modifyTime } = props.info;
  const { t } = useTranslation();
  const updateTime = dayjs(Number(modifyTime)).format("YYYY-MM-DD HH:mm");

  const handleGoArticle = () => {
    console.log("TODO go article");
  };

  return (
    <>
      <div className="article-card" onClick={handleGoArticle}>
        <Card
          bordered
          headerLine={false}
          shadows="hover"
          title={
            <div className="article-title">
              <span className="article-title--title">{title}</span>
              {type.length &&
                type.map((item, index) => (
                  <Tag
                    key={"article-type-" + index}
                    className="article-title--type"
                    color={item.color as TagColor}
                  >
                    {item.type}
                  </Tag>
                ))}
            </div>
          }
          headerExtraContent={
            <div className="article-extra-title">
              {t("article.modify_time")} : {updateTime}
            </div>
          }
        >
          {desc}
        </Card>
      </div>
    </>
  );
};

export default ArticleCard;
