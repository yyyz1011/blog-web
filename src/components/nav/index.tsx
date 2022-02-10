import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routers } from '@/routers';
import { useTranslation } from 'react-i18next';
import { Avatar, Dropdown, Form, Modal, Nav as SemiNav, Toast, Tooltip } from '@douyinfe/semi-ui';
import { IconLanguage } from '@douyinfe/semi-icons';
import './index.less';
import store from '@/store';
import { SET_USER_AVATAR } from '@/store/type/user';

type language_cn = 'cn';
type language_en = 'en';
type languageType = language_cn | language_en
const language_cn = 'cn';
const language_en = 'en';

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<languageType>(language_cn);
  const [userStore, setUserStore] = useState(store.userStore.getState());
  const [formApi, setFormApi] = useState(null);
  const [visibleLogin, setVisibleLogin] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    if (language === language_cn) {
      // @ts-ignore
      setLanguage(language_en);
      i18n.changeLanguage(language_en).then();
    } else {
      // @ts-ignore
      setLanguage(language_cn);
      i18n.changeLanguage(language_cn).then();
    }
  };

  const getUserInfo = () => {
    if (!formApi) return;
    // @ts-ignore
    formApi.validate()
      .then((values: { username: string }) => {
        const { username } = values;
        store.userStore.dispatch({
          type: SET_USER_AVATAR,
          value: {
            avatar: `https://q1.qlogo.cn/g?b=qq&nk=${username}&s=100`,
            username: username
          }
        });
        setUserStore(store.userStore.getState());
        setVisibleLogin(false);
      })
      .catch(() => {
        Toast.error(t('nav.login_modal_error'));
      });
  };

  const exitUserInfo = () => {
    store.userStore.dispatch({
      type: SET_USER_AVATAR,
      value: {
        avatar: null,
        username: null
      }
    });
    setUserStore(store.userStore.getState());
    setVisibleLogin(false);
  };

  // @ts-ignore
  return <>
    <SemiNav
      mode='horizontal'
      items={Routers.map(item => ({ itemKey: item.path, text: t('nav.' + item.title) }))}
      onSelect={key => {
        // @ts-ignore
        navigate(key.itemKey);
      }}
      footer={
        <div className='footer'>
          <Tooltip content={t('nav.change_language')}>
            <IconLanguage size='large' onClick={changeLanguage} />
          </Tooltip>
          <Dropdown
            position='bottom'
            render={
              <Dropdown.Menu>
                {!userStore.avatar &&
                <Dropdown.Item onClick={() => setVisibleLogin(true)}>{t('nav.login')}</Dropdown.Item>}
                {userStore.avatar && <Dropdown.Item onClick={exitUserInfo}>{t('nav.exit')}</Dropdown.Item>}
              </Dropdown.Menu>
            }
          >
            <Avatar
              size='small'
              className='avatar'
              src={userStore.avatar}>
              {t('nav.visitor')}
            </Avatar>
          </Dropdown>
        </div>
      }
    />
    <Modal
      title={t('nav.login_modal_title')}
      visible={visibleLogin}
      onOk={getUserInfo}
      onCancel={() => setVisibleLogin(false)}
      okText={t('nav.login_modal_ok')}
      cancelText={t('nav.login_modal_cancel')}
    >
      <Form getFormApi={formApi => {
        // @ts-ignore
        setFormApi(formApi);
      }} style={{ width: 400 }}>
        {({ formState, values, formApi }) => <>
          <Form.Input
            field='username'
            label={t('nav.login_modal_label')}
            style={{ width: '100%' }}
            placeholder={t('nav.login_modal_placeholder') as React.ReactText}
            trigger='blur'
            rules={[
              { required: true, message: t('nav.login_modal_rules_require') },
              {
                validator: (rule, value) => /^[1-9][0-9]{4,9}$/gim.test(value),
                message: t('nav.login_modal_rules_num')
              }
            ]}
          />
        </>}
      </Form>
    </Modal>
  </>;
};

export default Nav;