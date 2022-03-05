// 用户信息
export const LOCALSTORAGE_AUTHOR_INFO: string = "LOCALSTORAGE_AUTHOR_INFO";
// 语言信息
export const LOCALSTORAGE_LANGUAGE: string = "LOCALSTORAGE_LANGUAGE";

// 博主QQ账号
export const QQAccount: string = "1540032876@qq.com";

// 友链
export interface LinkListItem {
  name: string;
  avatar: string;
  uri: string;
  desc: string;
}
export const linkList: Array<LinkListItem> = [
  {
    name: "Mr.BelieVe",
    uri: "http://mrbelieve.tech/",
    avatar: "http://mrbelieve.tech/img/logo.png",
    desc: "Mr.BelieVe's Treasure",
  },
  {
    name: "黑白",
    uri: "http://h11ba1.com/",
    avatar: "https://h11ba1.com/img/favicon.png",
    desc: "h11ba1's blog",
  },
  {
    name: "palmcivet",
    uri: "https://palmcivet.github.io/",
    avatar: "https://avatars.githubusercontent.com/u/30434733",
    desc: "palmcivet's blog",
  },
];

// 城市足迹图
export const travelList: Array<string> = [
  '河北',
  '山西',
  // '辽宁',
  // '吉林',
  // '黑龙江',
  '江苏',
  '浙江',
  '安徽',
  '福建',
  '江西',
  '山东',
  '河南',
  '湖北',
  '湖南',
  // '广东',
  // '海南',
  '四川',
  '贵州',
  // '云南',
  '陕西',
  '甘肃',
  '青海',
  // '台湾',
  "北京",
  "天津",
  "上海",
  "重庆",
  // '内蒙古',
  '广西',
  // '西藏',
  '宁夏',
  // '新疆',
  // "香港",
  // "澳门",
];
