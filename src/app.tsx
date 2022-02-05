import React, { Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { RouterType } from '@/routers'
import { Routers } from '@/routers'
import Nav from '@/components/nav'
import { Layout } from '@douyinfe/semi-ui'
import '@/assets/css/layout.less'

const { Header, Content } = Layout

const App: React.FC = () => {
  return (
    <>
      <HashRouter>
        <Header className='layout-header'>
          <Nav />
        </Header>
        <Content>
          <Suspense fallback={(<div />)}>
            <Routes>
              <Route path='*' element={<Navigate to='/' />} />
              {
                Routers.map((item: RouterType) => (
                  <Route key={item.key} path={item.path} element={< item.component />} />))
              }
            </Routes>
          </Suspense>
        </Content>
      </HashRouter>
    </>
  )
}

export default App