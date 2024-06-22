"use client"
import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'



import { UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"


const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="root">
      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>
      

    </main>
  )
}

export default Layout