import React, { lazy } from 'react';

type RouterType = {
  key: string,
  path: string,
  component: React.LazyExoticComponent<any>,
  title: string
}

const HomeRouter: RouterType = {
  key: 'home',
  path: '/',
  component: lazy(() => import('@/views/home')),
  title: 'home'
}

const ArticleRouter: RouterType = {
  key: 'article',
  path: '/article',
  component: lazy(() => import('@/views/article')),
  title: 'article'
}

const PictureRouter: RouterType = {
  key: 'picture',
  path: '/picture',
  component: lazy(() => import('@/views/picture')),
  title: 'picture'
}

const BlogLinkRouter: RouterType = {
  key: 'blog-link',
  path: '/blog-link',
  component: lazy(() => import('@/views/blog-link')),
  title: 'blog_link'
}

const MessageRouter: RouterType = {
  key: 'message',
  path: '/message',
  component: lazy(() => import('@/views/message')),
  title: 'message'
}

const AboutRouter: RouterType = {
  key: 'about',
  path: '/about',
  component: lazy(() => import('@/views/about')),
  title: 'about'
}

const Routers: RouterType[] = ([
  HomeRouter,
  ArticleRouter,
  PictureRouter,
  MessageRouter,
  BlogLinkRouter,
  AboutRouter
])

export {
  Routers
}
export type { RouterType }
