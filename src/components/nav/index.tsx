import React from 'react'
import { Link } from 'react-router-dom'
import type { RouterType } from '@/routers'
import { Routers } from '@/routers'
import { useTranslation } from 'react-i18next'

const Nav: React.FC = () => {

  const { t, i18n } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  return (
    <>
      {
        Routers.map((item: RouterType) => (<Link key={'nav' + item.key} to={item.path}>{t('nav.' + item.title)}</Link>))
      }
      <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={localStorage.language}>
        <option value='cn'>{t('nav.language_cn')}</option>
        <option value='en'>{t('nav.language_en')}</option>
      </select>
    </>
  )
}

export default Nav