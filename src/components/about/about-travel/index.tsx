import "./index.less";
import "./china";

import { IconHash, IconImage } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import * as echarts from "echarts";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { travelList } from "@/constant";

interface AboutTravelProps {
  className?: string;
}
const AboutTravel: React.FC<AboutTravelProps> = (props: AboutTravelProps) => {
  const { className = "" } = props;
  const navigate = useNavigate();
  const chartsRef: React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    const myChart = echarts.init(chartsRef.current);
    const option = {
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
    };
    myChart.setOption(option);
  }, [chartsRef]);

  return (
    <div className={`travel ${className}`}>
      <div className="travel-content">
        <div className="travel-content-title">
          <IconHash className="title-icon" />
          在路上
        </div>
        <div className="travel-content-text">
        一程山、一程水一路行走、一路回忆千帆阅尽愿我们都能与更好的自己相遇~</div>
        <div className="travel-content-summary">
        已经努力走过了
          <span className="summary-num">{travelList.length}</span>
          个省份
        </div>
        <div className="operate">
          <Button
            className="operate-button"
            theme="solid"
            type="primary"
            onClick={() => navigate("/picture")}
          >
            <IconImage />
            <span className="button-text">跳转至图库</span>
          </Button>
        </div>
      </div>
      <div ref={chartsRef} className="travel-charts"></div>
    </div>
  );
};

export default AboutTravel;
