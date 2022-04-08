import "./index.less";

import React, { useEffect, useRef, useState } from "react";

/**
 * @params
 * contentList 轮播图内容list
 * defaultIndex 默认开始的次序
 * duration 每张轮播图停留时间
 * isShowPoint 是否展示轮播底部点
 */
interface CarouselProps {
  contentList: Array<React.ReactNode | HTMLDivElement>;
  defaultIndex?: number;
  duration?: number | "infinite";
  isShowPoint?: boolean;
}

const LeafCarousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const {
    contentList,
    defaultIndex = 0,
    duration = 3000,
    isShowPoint = true,
  } = props;
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const timer = useRef<NodeJS.Timeout | null>();

  let i = activeIndex;

  function updateActiveIndex() {
    if (i < contentList.length - 1) {
      i++;
      setActiveIndex(i);
    } else {
      i = 0;
      setActiveIndex(i);
    }
  }

  useEffect(() => {
    if (duration === "infinite") return;
    timer.current = setInterval(updateActiveIndex, duration);
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="carousel">
      {contentList.map((Node: React.ReactNode, index: number) =>
        React.createElement(
          "div",
          {
            className: "carousel-item",
            key: "carousel-item-" + index,
            style: {
              left: `${index * 100}%`,
              transform: `translateX(-${activeIndex * 100}%)`,
            },
          },
          Node
        )
      )}

      {isShowPoint && 
        <div className="control-wrapper">
          {contentList.map((_: React.ReactNode, index: number) => 
            <input
              key={"carousel-input-control" + index}
              type="radio"
              name="control"
              className={["control", "control-" + index].join(" ")}
              checked={index === activeIndex}
              onChange={() => setActiveIndex(index)}
            />
          )}
        </div>
      }
    </div>
  );
};

export default LeafCarousel;
