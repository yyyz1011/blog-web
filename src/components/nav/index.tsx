import React from 'react'
import { Link } from 'react-router-dom'
import type { RouterType } from '@/routers'
import { Routers } from '@/routers'

const Nav: React.FC = () => {
  return (
    <>
      {
        Routers.map((item: RouterType) => (<Link key={'nav' + item.key} to={item.path}>{item.title}</Link>))
      }
    </>
  )
}

export default Nav