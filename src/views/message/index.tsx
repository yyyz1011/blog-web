import React, { useEffect, useState } from "react";
import "./index.less";
import MessageList from "@/components/message/message-list";
import { useTranslation } from "react-i18next";
import LeafEditor from "@/components/common/leaf-editor";
import Api from "@/network/api";
import { observer, inject } from "mobx-react";
import { Notification } from "@douyinfe/semi-ui";
import { GetMessageListItem } from "@/network/apiType";

const Message: React.FC<any> = (props: any) => {
  const { t } = useTranslation();
  const userAccount = props.store.userStore.account;
  const userNickName = props.store.userStore.nickname;
  const [messageList, setMessageList] = useState<GetMessageListItem[]>([]);

  useEffect(() => {
    getMessageAllList();
  }, []);

  async function handleSubmit(text: string) {
    let isSubmit = false;
    try {
      const data = await Api.Message.createMessage({
        account: userAccount,
        nick_name: userNickName,
        content: text,
      });
      if (data) {
        isSubmit = true;
      }
    } catch (err: any) {
      window.$catch(err.message);
    }
    return isSubmit;
  }

  function submitSuccess() {
    Notification.success({
      content: t("message.message_success"),
    });
    getMessageAllList();
  }

  async function getMessageAllList() {
    try {
      const data = await Api.Message.getMessageList();
      setMessageList(data);
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  return (
    <div className="message">
      <div>
        <LeafEditor
          placeholder={t("message.editor_placeholder")}
          operateText={t("message.editor_operate_text")}
          operateDisabledText={t("message.editor_operate_disable_text")}
          validateErrorText={t("message.editor_error_text")}
          submit={handleSubmit}
          success={submitSuccess}
          isEdit={userAccount}
        />
      </div>
      <div className="message-title">{t("message.history_message")}</div>
      <MessageList messageList={messageList}></MessageList>
    </div>
  );
};

export default inject("store")(observer(Message));
