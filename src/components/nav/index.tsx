import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { RouterType } from '@/routers';
import { Routers } from '@/routers';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { IconLanguage } from '@douyinfe/semi-icons';
import './index.less';

const language_cn: string = 'cn';
const language_en: string = 'en';

const Nav: React.FC = () => {
  // @ts-ignore
  const [language, setLanguage] = useState<'en' | 'cn'>(language_cn);
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

  return (
    <>
      <div className='nav-link'>
        {
          Routers.map((item: RouterType) => (
            <Button className='nav-link--item' key={'nav' + item.key} theme='borderless' type='tertiary'>
              <Link to={item.path}>{t('nav.' + item.title)}</Link>
            </Button>
          ))
        }
      </div>
      <Tooltip content={t('nav.change_language')}>
        <IconLanguage size='large' onClick={changeLanguage} />
      </Tooltip>
    </>
  );
};

export default Nav;