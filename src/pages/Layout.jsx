import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { UserProvider } from '../../context/UserProvider'
import { LayoutGrid } from 'lucide-react';


export default function Layout() {
 

  return (
    <UserProvider>
      <div className='layout w-full h-full  text-gray-800 relative overflow-hidden'>
        {/* Watermarks for a fun touch */}
        <LayoutGrid
          className="absolute -top-1/4 -left-1/4 text-gray-100 opacity-40 transform rotate-12"
          size={400}
          strokeWidth={0.5}
        />
        <LayoutGrid
          className="absolute -bottom-1/4 -right-1/4 text-gray-100 opacity-30 transform -rotate-12"
          size={500}
          strokeWidth={0.5}
        />
        {/* Additional Watermarks */}
        <LayoutGrid
          className="absolute top-1/4 right-[-5%] text-gray-100 opacity-20 transform rotate-[25deg]"
          size={300}
          strokeWidth={0.4}
        />
        <LayoutGrid
          className="absolute bottom-[15%] left-[-10%] text-gray-100 opacity-25 transform -rotate-[30deg]"
          size={350}
          strokeWidth={0.4}
        />
        <LayoutGrid
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-200 opacity-10"
          size={600}
          strokeWidth={0.3}
        />

        {/* Ensure Navbar, Outlet, and Footer are on top of watermarks if needed using z-index */}
        <Navbar className="relative z-10" />
        <main className='min-h-screen relative z-10'>
            <Outlet/>
        </main>
        <Footer className="relative z-10" />
    </div>
    </UserProvider>
  )
}
