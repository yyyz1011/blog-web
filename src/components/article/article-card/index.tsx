import React from "react";
import { Card, Tag, Tooltip } from "@douyinfe/semi-ui";
import "./index.less";
import { TagColor } from "@douyinfe/semi-ui/lib/es/tag";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { IconLikeThumb, IconMail, IconVideo } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";

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
  isShowModifyTime?: boolean;
  isShowExtraSummary?: boolean;
  loading?: boolean;
}

const ArticleCard: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const { id, title, desc, type, modify_time: modifyTime } = props.info;
  const {
    loading = false,
    isShowModifyTime = true,
    isShowExtraSummary = true,
  } = props;
  const { t } = useTranslation();
  const updateTime = dayjs(Number(modifyTime)).format("YYYY-MM-DD HH:mm");

  const handleGoArticle = () => navigate(`/article-detail/${id}`);

  return (
    <>
      <div className="article-card" onClick={handleGoArticle}>
        <Card
          loading={loading}
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
            isShowModifyTime ? (
              <div className="article-extra-title">
                {t("article.modify_time")} : {updateTime}
              </div>
            ) : (
              <></>
            )
          }
        >
          <div className="article-card-content">
            <div className="article-card-content--desc">{desc}</div>
            {isShowExtraSummary && (
              <div className="article-card-content--info">
                <Tooltip content={t("article.page_view")}>
                  <div className="info-item">
                    <IconVideo />
                    <div>1234</div>
                  </div>
                </Tooltip>
                <Tooltip content={t("article.like")}>
                  <div className="info-item">
                    <IconLikeThumb />
                    <div>1</div>
                  </div>
                </Tooltip>
                <Tooltip content={t("article.message")}>
                  <div className="info-item">
                    <IconMail />
                    <div>123123</div>
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default ArticleCard;
