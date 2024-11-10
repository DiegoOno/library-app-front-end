'use client'

import SideMenu from './SideMenu'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="w-full h-full flex flex-row">
        <SideMenu />
        <div className="w-full h-full flex flex-col pt-12">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
