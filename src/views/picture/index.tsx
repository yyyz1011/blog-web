import React, { useState, useEffect } from "react";
import { getFreeImg } from "@/network";
import "./index.less";
import LeafWaterfall from "@/components/common/leaf-waterfall";

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
    <div className="picture-wrapper">
      <LeafWaterfall></LeafWaterfall>
      {/* <div className="picture-wrapper">
        {imgList &&
          imgList.map((item: string, index: number) => (
            <div className="picture-item" key={index}>
              <img src={item} />
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default Picture;
