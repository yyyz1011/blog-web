import React from "react";
import { Card, Tag, Tooltip } from "@douyinfe/semi-ui";
import "./index.less";
import { TagColor } from "@douyinfe/semi-ui/lib/es/tag";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { IconLikeThumb, IconMail, IconVideo } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { GetArticleListItem } from "@/network/apiType";
interface IProps {
  info: GetArticleListItem;
  isShowModifyTime?: boolean;
  isShowExtraSummary?: boolean;
  loading?: boolean;
}

const ArticleCard: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const {
    aid,
    title,
    desc,
    atLabel,
    modify_time: modifyTime,
    article_vv: articleVv,
    article_like: articleLike,
  } = props.info;
  const {
    loading = false,
    isShowModifyTime = true,
    isShowExtraSummary = true,
  } = props;
  const { t } = useTranslation();
  const updateTime = dayjs(Number(modifyTime)).format("YYYY-MM-DD HH:mm");

  const handleGoArticle = () => navigate(`/article-detail/${aid}`);

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
              <Tag className="article-title--type">{atLabel}</Tag>
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
                    <div>{articleVv}</div>
                  </div>
                </Tooltip>
                <Tooltip content={t("article.like")}>
                  <div className="info-item">
                    <IconLikeThumb />
                    <div>{articleLike}</div>
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
