import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { UserProvider } from '../../context/UserProvider'


export default function Layout() {
 

  return (
    <UserProvider>
      <div className='layout w-full h-full'>
        <Navbar />
        <main className='min-h-screen'>
            <Outlet/>
        </main>
        <Footer />
    </div>
    </UserProvider>
  )
}
