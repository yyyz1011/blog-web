import React, { useState, useEffect } from "react";
import { getFreeImg } from "@/network";
import "./index.less";

const Picture: React.FC = () => {
  const [imgList, setImgList] = useState([]);

  const getAllImg = () => {
    const mockLinkList = new Array(9).fill(getFreeImg);
    const data = mockLinkList.map((item) => {
      return item({
        width: 400,
        height: Math.floor(Math.random() * 3 + 5) * 100,
      });
    });
    setImgList([...imgList, ...data]);
  };

  useEffect(() => {
    getAllImg();
  }, []);

  return (
    <>
      <div className="picture-wrapper">
        {imgList &&
          imgList.map((item: string, index: number) => (
            <div className="picture-item" key={index}>
              <img className="picture-item-img" src={item} />
              <div className="picture-extra-info">
                <div className="picture-item-title">Title Goes Here</div>
                <div className="picture-item-modify-time">2022-3-3</div>
                <div className="picture-item-content">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
                  quod et deleniti nobis quasi ad, adipisci perferendis totam,
                  ducimus incidunt dolore aut, quae quaerat architecto quisquam
                  repudiandae amet nostrum quidem?
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Picture;
