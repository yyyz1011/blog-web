import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import type { RouterType } from '@/routers'
import { Routers } from '@/routers'
import Nav from '@/components/nav'

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Suspense fallback={(<div />)}>
          <Routes>
            {
              Routers.map((item: RouterType) => (
                <Route key={item.key} path={item.path} element={< item.component />} />))
            }
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App