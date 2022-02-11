import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routers } from "@/routers";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Dropdown,
  Form,
  Modal,
  Nav as SemiNav,
  Toast,
  Tooltip,
} from "@douyinfe/semi-ui";
import { IconLanguage } from "@douyinfe/semi-icons";
import { BaseFormApi } from "@douyinfe/semi-foundation/form/interface";
import "./index.less";
import store from "@/store";
import { SET_USER_AVATAR } from "@/store/type/user";
import useLocalStorageState from "@/utils/useLocalStorageState";
import { LOCALSTORAGE_AUTHOR_INFO, LOCALSTORAGE_LANGUAGE } from "@/constant";

const language_cn = "cn";
const language_en = "en";

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const [userStore, setUserStore] = useState(store.userStore.getState());
  const [formApi, setFormApi] = useState<BaseFormApi | null>(null);
  const [visibleLogin, setVisibleLogin] = useState<boolean>(false);
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
      store.userStore.dispatch({
        type: SET_USER_AVATAR,
        value: localstorageUserInfo,
      });
      setUserStore(store.userStore.getState());
    }
    if (localstorageLanguage) {
      i18n.changeLanguage(localstorageLanguage).then();
    }
  }, []);

  const changeLanguage = () => {
    if (localstorageLanguage === language_cn) {
      // @ts-ignore
      setLocalstorageLanguage(language_en);
      i18n.changeLanguage(language_en).then();
    } else {
      // @ts-ignore
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
          type: SET_USER_AVATAR,
          value: {
            avatar: `https://q1.qlogo.cn/g?b=qq&nk=${account}&s=100`,
            nickname: nickname || account,
            account,
          },
        };
        store.userStore.dispatch(userInfo);
        setUserStore(store.userStore.getState());
        setLocalstorageUserInfo(userInfo.value);
        setVisibleLogin(false);
      })
      .catch(() => {
        Toast.error(t("nav.login_modal.error_info"));
      });
  };

  const exitUserInfo = () => {
    store.userStore.dispatch({
      type: SET_USER_AVATAR,
      value: {
        avatar: null,
        nickname: null,
        account: null,
      },
    });
    setUserStore(store.userStore.getState());
    setLocalstorageUserInfo(null);
    setVisibleLogin(false);
  };

  // @ts-ignore
  return (
    <>
      <SemiNav
        mode="horizontal"
        items={Routers.map((item) => ({
          itemKey: item.path,
          text: t("nav." + item.title),
          icon: <item.icon />,
        }))}
        onSelect={(key) => {
          // @ts-ignore
          navigate(key.itemKey);
        }}
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
                    <Dropdown.Item onClick={exitUserInfo}>
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
          getFormApi={(formApi: BaseFormApi) => {
            // @ts-ignore
            setFormApi(formApi);
          }}
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
    </>
  );
};

export default Nav;
