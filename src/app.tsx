import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import type { RouterType } from '@/routers'
import { Routers } from '@/routers'
import Nav from '@/components/nav'
import { Layout } from '@douyinfe/semi-ui'
import '@/assets/css/layout.less'

const { Header, Content } = Layout

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Header className='layout-header'>
          <Nav />
        </Header>
        <Content>
          <Suspense fallback={(<div />)}>
            <Routes>
              {
                Routers.map((item: RouterType) => (
                  <Route key={item.key} path={item.path} element={< item.component />} />))
              }
            </Routes>
          </Suspense>
        </Content>
      </BrowserRouter>
    </>
  )
}

export default App