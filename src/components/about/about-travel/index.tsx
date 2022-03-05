import React, { useEffect } from "react";
import "./index.less";
import * as echarts from "echarts";
import "./china";
import { travelList } from "@/constant";
import { useTranslation } from "react-i18next";
import { IconHash } from "@douyinfe/semi-icons";

interface AboutTravelProps {
  className?: string;
}
const AboutTravel: React.FC<AboutTravelProps> = (props: AboutTravelProps) => {
  const { className = "" } = props;
  const { t } = useTranslation();
  const chartsRef: React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    const myChart = echarts.init(chartsRef.current);
    let option = {
      //配置属性
      geo: {
        map: "china",
        aspectScale: 0.75, //长宽比
        zoom: 1.2,
        roam: false,
        show: true,
        silent: true,
        regions: travelList.map((item) => ({
          name: item,
          itemStyle: {
            normal: {
              opacity: 0.5, // 透明度
              borderColor: "#000000", // 省份界线颜色
              borderWidth: 0, // 省份界线的宽度
              areaColor: "rgb(1,120,250)", // 整个省份的颜色
            },
          },
        })),
        itemStyle: {
          // 设置地图的样式
          normal: {
            areaColor: "#ffffff", // 地图样色
            shadowColor: "#ffffff", // 阴影
            shadowOffsetX: 0,
            shadowOffsetY: 0,
          },
          emphasis: {
            areaColor: "#2AB8FF",
            borderWidth: 0,
            color: "green",
            label: {
              show: false,
            },
          },
        },
      },
      //   series: [
      //     {
      //       name: "数据",
      //       type: "map",
      //       mapType: "china",
      //       selectedMode: "single",
      //       roam: false,
      //       label: {
      //         normal: {
      //           show: false,
      //         },
      //         emphasis: {
      //           show: true,
      //         },
      //       },
      //     },
      //   ],
    };
    myChart.setOption(option);
  }, [chartsRef]);

  return (
    <div className={`travel ${className}`}>
      <div className="travel-content">
        <div className="travel-content-title">
          <IconHash className="title-icon" />
          {t("about.travel_title")}
        </div>
        <div className="travel-content-text">{t("about.travel_text")}</div>
        <div className="travel-content-summary">
          {t("about.travel_summary_pre")}
          <span className="summary-num">{travelList.length}</span>
          {t("about.travel_summary_append")}
        </div>
      </div>
      <div ref={chartsRef} className="travel-charts"></div>
    </div>
  );
};

export default AboutTravel;
