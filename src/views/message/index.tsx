import React from "react";
import "./index.less";
import LeafEditor from "@/components/common/leaf-editor";
import MessageList from "@/components/message/message-list";
import { useTranslation } from "react-i18next";

const Message: React.FC = () => {
  const { t } = useTranslation();

  const submitMessage = (messageStr: string) => {
    console.log(messageStr);
  };

  return (
    <div className="message">
      <div>
        <LeafEditor
          isShowOperate={true}
          operateText={t("message.editor_operate_text")}
          placeholder={t("message.editor_placeholder")}
          requiredErrorTitle={t("message.editor_error_text")}
          submit={submitMessage}
        />
      </div>
      <div className="message-title">{t("message.history_message")}</div>
      <MessageList></MessageList>
    </div>
  );
};

export default Message;
