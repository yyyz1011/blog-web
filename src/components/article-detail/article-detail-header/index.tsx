import "./index.less";

import { IconPriceTag } from "@douyinfe/semi-icons";
import { Card, Descriptions } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
// @ts-ignore
import { formatPrice } from "leaf-util";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { GetArticleListItem } from "@/network/apiType";

interface ArticleDetailHeaderProps {
  articleInfo: GetArticleListItem | null;
}
interface DescriptionsType {
  key: string;
  value: any;
}
const ArticleDetailHeader: React.FC<ArticleDetailHeaderProps> = (
  props: ArticleDetailHeaderProps
) => {
  const [t] = useTranslation();
  const {articleInfo} = props;
  const [loading, setLoading] = useState(true);
  const [descriptions, setDescriptions] = useState<DescriptionsType[]>([]);

  useEffect(() => {
    setLoading(articleInfo ? false : true);
    if (articleInfo) {
      const description: DescriptionsType[] = [
        {
          key: t("article_detail.description_create_time"),
          value: dayjs(Number(articleInfo.create_time)).format("YYYY-MM-DD"),
        },
        {
          key: t("article_detail.description_modify_time"),
          value: dayjs(Number(articleInfo.modify_time)).format("YYYY-MM-DD"),
        },
        {
          key: t("article_detail.description_article_type"),
          value: articleInfo.atLabel,
        },
        {
          key: t("article_detail.description_article_vv"),
          value: formatPrice(articleInfo.article_vv),
        },
        {
          key: t("article_detail.description_article_like"),
          value: formatPrice(articleInfo.article_like),
        },
      ];
      setDescriptions(description);
    }
  }, [articleInfo]);

  return (
    <Card
      className="article-detail-header"
      title={
        <div className="title">
          <IconPriceTag className="icon" />
          {articleInfo?.title}
        </div>
      }
      loading={loading}
    >
      <Descriptions data={descriptions} row />
    </Card>
  );
};

export default ArticleDetailHeader;
