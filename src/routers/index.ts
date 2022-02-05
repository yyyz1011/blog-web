import React, { lazy } from 'react'

type RouterType = {
  key: string,
  path: string,
  component: React.LazyExoticComponent<any>,
  title: string
}

const HomeRouter: RouterType = {
  key: 'home',
  path: '',
  component: lazy(() => import('@/views/home')),
  title: 'home'
}

const AboutRouter: RouterType = {
  key: 'about',
  path: '/about',
  component: lazy(() => import('@/views/about')),
  title: 'about'
}

const Routers: RouterType[] = ([
  HomeRouter,
  AboutRouter
])

export {
  Routers
}
export type { RouterType }
