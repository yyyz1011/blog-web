import { Notification } from "@douyinfe/semi-ui";

export default (copyText: string, successTip?: string, errorTip?: string) => {
  let eInput = document.createElement("input");
  eInput.value = copyText;
  document.body.appendChild(eInput);
  eInput.select();
  const status = document.execCommand("Copy");
  eInput.style.display = "none";
  if (status && successTip) {
    Notification.success({
      position: "top",
      title: successTip,
    });
  }
  if (!status && errorTip) {
    Notification.error({
      position: "top",
      title: errorTip,
    });
  }
};
