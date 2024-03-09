import { Main } from 'next/document'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode} ) => {   //accept children trough props, also define type of children type: ReactNode
  return (
    <main className='auth'>{children}</main>
  )
}

export default Layout
