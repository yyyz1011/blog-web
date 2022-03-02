import React, { useState, useEffect } from "react";
import { getFreeImg } from "@/network";

const LeafWaterfall: React.FC = () => {
  const [imgList, setImgList] = useState([]);
  const [waterfallImgList, setWaterfallImgList] = useState([]);

  const waterfallImgWidth = 100;
  const waterfallImgRight = 10;
  const waterfallImgBottom = 10;
  const [waterfallImgCol, setWaterfallImgCol] = useState(null);

  const [waterfallDeviationHeight, setWaterfallDeviationHeight] = useState([]);

  const time: any = null;

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

  const resize = () => {
    if (time) return;
    const timer = setTimeout(() => {
      clearTimeout(time);
    });
  };

  useEffect(() => {
    getAllImg();
  }, []);

  return <div>{imgList}</div>;
};

export default LeafWaterfall;
