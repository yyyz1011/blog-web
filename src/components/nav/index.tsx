import "./index.less";

import { BaseFormApi } from "@douyinfe/semi-foundation/form/interface";
import { IconWrench } from "@douyinfe/semi-icons";
import {
  Avatar,
  Dropdown,
  Form,
  Modal,
  Nav as SemiNav,
  Notification,
  Toast,
  Tooltip,
} from "@douyinfe/semi-ui";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOCALSTORAGE_AUTHOR_INFO } from "@/constant";
import { getQQAvatar } from "@/network";
import { NavRouters } from "@/routers";
import useLocalStorageState from "@/utils/useLocalStorageState";

const Nav: React.FC<any> = () => {
  const navigate = useNavigate();
  const [formApi, setFormApi] = useState<BaseFormApi | null>(null);
  const [visibleLogin, setVisibleLogin] = useState<boolean>(false);
  const [visibleExit, setVisibleExit] = useState<boolean>(false);
  const [localstorageUserInfo, setLocalstorageUserInfo] = useLocalStorageState(
    null,
    LOCALSTORAGE_AUTHOR_INFO
  );

  const getUserInfo = () => {
    if (!formApi) return;
    formApi
      .validate()
      // @ts-ignore
      .then((values: { nickname: string; account: string }) => {
        const { nickname, account } = values;
        const userInfo = {
          avatar: getQQAvatar(account),
          nickname: nickname || account,
          account,
        };
        setLocalstorageUserInfo(userInfo);
        setVisibleLogin(false);
        Notification.open({
          title: `哈罗，${userInfo.nickname}`,
          content: "欢迎来到 leaf blog",
          duration: 3,
        });
        window.location.reload();
      })
      .catch(() => {
        Toast.error("请输入正确的内容~");
      });
  };

  const exitUserInfo = async () => {
    await setLocalstorageUserInfo(null);
    setVisibleExit(false);
    window.location.reload();
  };

  return (
    <>
      <SemiNav
        mode="horizontal"
        header={{
          logo: <img src={require("@/assets/img/leaf.svg")} alt="leaf-blog" />,
          text: "leaf blog",
        }}
        items={NavRouters.map((item) => ({
          itemKey: item.path,
          text: item.title,
          icon: <item.icon className="nav-item" />,
          className: "nav-item",
        }))}
        onSelect={(key) => navigate(key.itemKey as string)}
        footer={
          <div className="footer">
            <Tooltip content="提交BUG">
              <IconWrench
                className="nav-item"
                size="large"
                onClick={() =>
                  window.open("https://github.com/yyyz1011/blog-web/issues")
                }
              />
            </Tooltip>
            <Dropdown
              position="bottom"
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setVisibleLogin(true)}>
                    {localstorageUserInfo?.account ? "修改" : "QQ登录"}
                  </Dropdown.Item>
                  {!localstorageUserInfo?.account && (
                    <Dropdown.Item onClick={() => Toast.warning('正在接入了，请稍后o(╥﹏╥)o')}>
                      github登录
                    </Dropdown.Item>
                  )}
                  {localstorageUserInfo?.account && (
                    <Dropdown.Item onClick={() => setVisibleExit(true)}>
                      退出
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              }
            >
              <Avatar
                size="small"
                className="avatar"
                src={localstorageUserInfo?.avatar}
                alt="leaf-blog"
              >
                游客
              </Avatar>
            </Dropdown>
          </div>
        }
      />
      <Modal
        title={localstorageUserInfo?.account ? "游客更新" : "游客登录"}
        visible={visibleLogin}
        getPopupContainer={() => document.body}
        onOk={getUserInfo}
        onCancel={() => setVisibleLogin(false)}
        okText={localstorageUserInfo?.account ? "更新" : "登录"}
        cancelText="取消"
      >
        <Form
          getFormApi={(formApi: BaseFormApi) => setFormApi(formApi)}
          initValues={{
            account: localstorageUserInfo?.account,
            nickname: localstorageUserInfo?.nickname,
          }}
        >
          <Form.Input
            field="account"
            label="QQ账号"
            style={{ width: "100%" }}
            placeholder={"请输入你的QQ账号" as React.ReactText}
            trigger="blur"
            rules={[
              {
                required: true,
                message: "QQ账号不能为空",
              },
              {
                validator: (rule, value) => /^[1-9][0-9]{4,9}$/gim.test(value),
                message: "QQ账号格式错误",
              },
            ]}
          />
          <Form.Input
            field="nickname"
            label="昵称"
            style={{ width: "100%" }}
            placeholder={"请输入你的昵称" as React.ReactText}
            extraText="假如昵称为空，默认选择QQ账号作为昵称"
          />
        </Form>
      </Modal>
      <Modal
        title="退出账号"
        visible={visibleExit}
        getPopupContainer={() => document.body}
        onOk={exitUserInfo}
        onCancel={() => setVisibleExit(false)}
        okText="退出"
        cancelText="取消"
      >
        真的要退出么~
      </Modal>
    </>
  );
};

export default Nav;
