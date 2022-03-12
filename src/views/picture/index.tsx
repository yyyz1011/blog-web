import React, { useState, useEffect } from "react";
import { getFreeImg } from "@/network";
import "./index.less";
import AutoResponsive from "autoresponsive-react";

const Picture: React.FC = () => {
  const [imgList, setImgList] = useState([]);

  const getAllImg = () => {
    const mockLinkList = new Array(9).fill(getFreeImg);
    const data = mockLinkList.map((item) => {
      const width = 380;
      const height = Math.floor(Math.random() * 3 + 5) * 100;
      return {
        uri: item({
          width,
          height,
        }),
        width,
        height,
      };
    });
    setImgList([...imgList, ...data]);
  };

  const autoResponsiveOption = () => {
    return {
      containerWidth: 1200,
      itemClassName: "productListItem",
      gridWidth: 10,
      itemMargin: 20,
      transitionDuration: 0.5,
    };
  };

  useEffect(() => {
    getAllImg();
  }, []);

  return (
    <>
      <div className="picture-wrapper">
        <AutoResponsive {...autoResponsiveOption()}>
          {imgList.map((item: any, index: number) => {
            return (
              <ul
                key={"picture-item" + index}
                style={{
                  width: item.width,
                  height: item.height,
                }}
              >
                <div className="picture-item">
                  <img
                    className="picture-item-img"
                    src={item.uri}
                    style={{
                      width: item.width,
                      height: item.height,
                    }}
                  />
                  <div className="picture-extra-info">
                    <div className="picture-item-title">Title Goes Here</div>
                    <div className="picture-item-modify-time">2022-3-3</div>
                    <div className="picture-item-content">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Quis quod et deleniti nobis quasi ad, adipisci perferendis
                      totam, ducimus incidunt dolore aut, quae quaerat
                      architecto quisquam repudiandae amet nostrum quidem?
                    </div>
                  </div>
                </div>
              </ul>
            );
          })}
        </AutoResponsive>
      </div>
    </>
  );
};

export default Picture;
