import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import './index.css'
import Layout from './pages/Layout.jsx'
import Landing from './pages/Landing.jsx'
import Webtoons from "./pages/Webtoons.jsx"
import Webtoon from "./pages/Webtoon.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/SignUp.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import Read from './pages/Read.jsx'


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Layout/>,
    children: [
      {index: true, element: <Landing />},
      {path: "/webtoons", element: <Webtoons />},
      {path: "/webtoon/:webtoon_id", element: <Webtoon />},
      {path: "/read", element: <Read />},
      {path: "/login", element: <Login />},
      {path: "/signup", element: <Signup />},
      {path: "/about", element: <AboutUs />},
    ]
  }
])

console.log(location)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
