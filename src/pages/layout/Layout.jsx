import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    
  return (
    <main className='bg-black text-white min-h-[600px]'>
       <Header />
        <Outlet/>
       <Footer /> 
    </main>
  )
}

export default Layout