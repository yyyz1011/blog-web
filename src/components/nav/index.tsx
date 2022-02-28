import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavRouters } from "@/routers";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Dropdown,
  Form,
  Modal,
  Nav as SemiNav,
  Toast,
  Tooltip,
  Notification,
} from "@douyinfe/semi-ui";
import { IconLanguage } from "@douyinfe/semi-icons";
import { BaseFormApi } from "@douyinfe/semi-foundation/form/interface";
import "./index.less";
import useLocalStorageState from "@/utils/useLocalStorageState";
import { LOCALSTORAGE_AUTHOR_INFO, LOCALSTORAGE_LANGUAGE } from "@/constant";
import { getQQAvatar } from "@/network";
import { observer, inject } from "mobx-react";

const language_cn = "cn";
const language_en = "en";

const Nav: React.FC<any> = (props: any) => {
  const navigate = useNavigate();
  const userStore = props.store.userStore;
  const [formApi, setFormApi] = useState<BaseFormApi | null>(null);
  const [visibleLogin, setVisibleLogin] = useState<boolean>(false);
  const [visibleExit, setVisibleExit] = useState<boolean>(false);
  const [localstorageUserInfo, setLocalstorageUserInfo] = useLocalStorageState(
    null,
    LOCALSTORAGE_AUTHOR_INFO
  );
  const [localstorageLanguage, setLocalstorageLanguage] = useLocalStorageState(
    language_cn,
    LOCALSTORAGE_LANGUAGE
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (localstorageUserInfo) {
      props.store.userStore.setUserInfo(localstorageUserInfo);
    }
    if (localstorageLanguage) {
      i18n.changeLanguage(localstorageLanguage).then();
    }
  }, []);

  const changeLanguage = () => {
    if (localstorageLanguage === language_cn) {
      setLocalstorageLanguage(language_en);
      i18n.changeLanguage(language_en).then();
    } else {
      setLocalstorageLanguage(language_cn);
      i18n.changeLanguage(language_cn).then();
    }
  };

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
        props.store.userStore.setUserInfo(userInfo);
        setLocalstorageUserInfo(userInfo);
        setVisibleLogin(false);
        Notification.open({
          title: `${t("nav.login_modal.hi")}${userInfo.nickname}`,
          content: t("nav.login_modal.notify_content"),
          duration: 3,
        });
      })
      .catch(() => {
        Toast.error(t("nav.login_modal.error_info"));
      });
  };

  const exitUserInfo = () => {
    props.store.userStore.setUserInfo({
      avatar: null,
      nickname: null,
      account: null,
    });
    setLocalstorageUserInfo(null);
    setVisibleExit(false);
  };

  return (
    <>
      <SemiNav
        mode="horizontal"
        header={{
          logo: <img src={require("../../assets/img/leaf.svg")} />,
          text: "leaf blog",
        }}
        items={NavRouters.map((item) => ({
          itemKey: item.path,
          text: t("nav." + item.title),
          icon: <item.icon />,
        }))}
        onSelect={(key) => navigate(key.itemKey as string)}
        footer={
          <div className="footer">
            <Tooltip content={t("nav.change_language")}>
              <IconLanguage size="large" onClick={changeLanguage} />
            </Tooltip>
            <Dropdown
              position="bottom"
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setVisibleLogin(true)}>
                    {userStore.account ? t("nav.update") : t("nav.login")}
                  </Dropdown.Item>
                  {userStore.account && (
                    <Dropdown.Item onClick={() => setVisibleExit(true)}>
                      {t("nav.exit")}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              }
            >
              <Avatar size="small" className="avatar" src={userStore.avatar}>
                {t("nav.visitor")}
              </Avatar>
            </Dropdown>
          </div>
        }
      />
      <Modal
        title={
          userStore.account
            ? t("nav.login_modal.modal_update_title")
            : t("nav.login_modal.modal_login_title")
        }
        visible={visibleLogin}
        getPopupContainer={() => document.body}
        onOk={getUserInfo}
        onCancel={() => setVisibleLogin(false)}
        okText={
          userStore.account
            ? t("nav.login_modal.ok_update_text")
            : t("nav.login_modal.ok_login_text")
        }
        cancelText={t("nav.login_modal.cancel_text")}
      >
        <Form
          getFormApi={(formApi: BaseFormApi) => setFormApi(formApi)}
          initValues={{
            account: userStore.account,
            nickname: userStore.nickname,
          }}
        >
          <Form.Input
            field="account"
            label={t("nav.login_modal.account_label")}
            style={{ width: "100%" }}
            placeholder={
              t("nav.login_modal.account_placeholder") as React.ReactText
            }
            trigger="blur"
            rules={[
              {
                required: true,
                message: t("nav.login_modal.account_rules_require"),
              },
              {
                validator: (rule, value) => /^[1-9][0-9]{4,9}$/gim.test(value),
                message: t("nav.login_modal.account_rules_num"),
              },
            ]}
          />
          <Form.Input
            field="nickname"
            label={t("nav.login_modal.nickname_label")}
            style={{ width: "100%" }}
            placeholder={
              t("nav.login_modal.nickname_placeholder") as React.ReactText
            }
            extraText={t("nav.login_modal.nick_extra_text")}
          />
        </Form>
      </Modal>
      <Modal
        title={t("nav.exit_modal.modal_title")}
        visible={visibleExit}
        getPopupContainer={() => document.body}
        onOk={exitUserInfo}
        onCancel={() => setVisibleExit(false)}
        okText={t("nav.exit_modal.ok_exit_text")}
        cancelText={t("nav.exit_modal.cancel_text")}
      >
        {t("nav.exit_modal.exit_text")}
      </Modal>
    </>
  );
};

export default inject("store")(observer(Nav));
