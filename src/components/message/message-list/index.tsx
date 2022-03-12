import React, { useEffect, useState } from "react";
import "./index.less";
import { useTranslation } from "react-i18next";
import { List, Avatar } from "@douyinfe/semi-ui";
import { IconUserCircle, IconClock } from "@douyinfe/semi-icons";
import NoData from "@/components/no-data";
import InfiniteScroll from "react-infinite-scroller";
import { getQQAvatar } from "@/network/index";
import dayjs from "dayjs";

interface MessageListItem {
  account: string;
  nick_name: string;
  message_text: string;
  create_time: string;
}

const MessageList: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [messageList, setMessageList] = useState<Array<MessageListItem>>([]);

  const getMessageList = () => {
    setLoading(true);

    setTimeout(() => {
      setMessageList([
        ...messageList,
        {
          account: "1540032876",
          nick_name: "lala",
          message_text: `<h1>kdjafljkasdf打撒旦法啊</h1>
                <h4>阿斯蒂芬阿斯蒂<strong>芬</strong><u><em><strong>阿斯蒂芬多少分</strong></em></u></h4>
                <div class='blockquote'>阿斯蒂芬大幅阿萨德放点水啊</div>
                <ol>
                  <li>阿道夫&nbsp;</li>
                  <li>大师傅阿萨德按时</li>
                  <li>啊打 撒旦法按时发发斯蒂芬</li>
                </ol>`,
          create_time: "1647065938255",
        },
        {
          account: "1540032876",
          nick_name: "123123",
          message_text: `<h1>kdjafljkasdf打撒旦法啊</h1>
                <h4>阿斯蒂芬阿斯蒂<strong>芬</strong><u><em><strong>阿斯蒂芬多少分</strong></em></u></h4>
                <div class='blockquote'>阿斯蒂芬大幅阿萨德放点水啊</div>
                <ol>
                  <li>阿道夫&nbsp;</li>
                  <li>大师傅阿萨德按时</li>
                  <li>啊打 撒旦法按时发发斯蒂芬</li>
                </ol>`,
          create_time: "1647065938255",
        },
        {
          account: "154032876",
          nick_name: "阿斯蒂芬阿斯蒂",
          message_text: `<h1>kdjafljkasdf打撒旦法啊</h1>
                <h4>阿斯蒂芬阿斯蒂<strong>芬</strong><u><em><strong>阿斯蒂芬多少分</strong></em></u></h4>
                <div class='blockquote'>阿斯蒂芬大幅阿萨德放点水啊</div>
                <ol>
                  <li>阿道夫&nbsp;</li>
                  <li>大师傅阿萨德按时</li>
                  <li>啊打 撒旦法按时发发斯蒂芬</li>
                </ol>`,
          create_time: "1647065938255",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getMessageList();
  }, []);

  return (
    <div>
      {!messageList.length ? (
        <NoData text={t("message.message_no_data")} />
      ) : (
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          threshold={20}
          loadMore={getMessageList}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <List
            loadMore={<div>加载更多</div>}
            dataSource={messageList}
            renderItem={(item) => (
              <List.Item
                header={
                  <Avatar src={getQQAvatar(item.account)}>
                    {item.nick_name}
                  </Avatar>
                }
                main={
                  <div className="list-item">
                    <div className="list-item--title">
                      {t("message.message_item_title_name_pre")}
                      <IconUserCircle className="item-icon" />
                      {item.nick_name}
                      {t("message.message_item_title_name_append")}
                      <IconClock className="item-icon" />
                      {dayjs(Number(item.create_time)).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </div>
                    <div
                      className="list-item--content"
                      dangerouslySetInnerHTML={{ __html: item.message_text }}
                    ></div>
                  </div>
                }
              />
            )}
          />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MessageList;
