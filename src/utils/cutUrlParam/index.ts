export default function cutUrlParam(URL: string) {
  if (typeof URL !== "string") {
    throw "参数不是 string 类型!";
  }
  const theRequest: any = new Object();
  if (URL.indexOf("?") !== -1) {
    const str = URL.split("?")[1].split("&");
    for (let i = 0; i < str.length; i++) {
      theRequest[str[i].split("=")[0]] = str[i].split("=")[1];
    }
  }
  return theRequest;
}
