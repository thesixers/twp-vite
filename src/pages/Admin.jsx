import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserProvider'
import { Mail, Users, LayoutDashboard } from 'lucide-react'
import AdminDashboard from '../components/AdminDashboard'
import AdminUsersTab from '../components/AdminUsersTab'
import AdminWebtoonsTab from '../components/AdminWebtoonsTab'
import AdminMessageTab from '../components/AdminMessageTab'
import axios from 'axios'
import { serverUrl } from '../../requests/apicalls'
import AddScripture from '../components/AddScripture'

export default function Admin() {
  const { user } = useUserContext()
  const [adminNav, setAdminNav] = useState(["dashboard", "users", "webtoons", "messages"])
  const [currentNav, setCurrentNav] = useState(0)
  const navigate = useNavigate()
  const [toonz, setToonz] = useState([])
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [approvedToonz, setApprovedToonz] = useState([])
  const [pendingToonz, setPendingToonz] = useState([])
  const [rejectedToonz, setRejectedToonz] = useState([])

  useEffect(() => {
    if(!user){
      navigate("/")
    }else if(!user.type.includes("admin")){
      navigate("/")
    }
    
    const fetchStuff = async () => {
      try {
        
        let res = await axios.get(`${serverUrl}/twp/admin`, { withCredentials: true})
        if(res.data.toonz){
          setToonz(res.data.toonz)
        }
        if(res.data.users){
          setUsers(res.data.users)
        }
        if(res.data.messages){
          setMessages(res.data.messages)
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchStuff()
  }, [])

  useEffect(() => {
    let filteredToonz = toonz.filter(toon => toon.status === 'approved')
    let pendingToonz = toonz.filter(toon => toon.status === 'pending')
    let rejectedToonz = toonz.filter(toon => toon.status === 'rejected')
    setApprovedToonz(filteredToonz)
    setPendingToonz(pendingToonz)
    setRejectedToonz(rejectedToonz)
  }, [toonz])




  return (
    <div>
      <section className="admin">
        <div className="admin-nav">
            <div className="nav-item">Admin</div>
        </div>
        <div className="sub-menu">
            {
              adminNav.map((item, index) => {

                return (
                  <div 
                    key={index} 
                    onClick={() => setCurrentNav(index)}
                    className={`submenu-item db-sub ${currentNav === index ? "text-[#e44616]" : "text-gray-300"}`}
                    >
                    {
                      item === "dashboard" ? 
                      <LayoutDashboard /> : 
                      item === "users" ? 
                      <Users /> : item === "messages" ? 
                      <Mail /> :  
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        className="webtoon-icon"
                        style={{width: "30px", height: "30px", marginTop: "3px"}}>
                        <path d="M10 10h80v60H50l-15 15v-15H10V10z" />
                        <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="30px" font-family="Arial, sans-serif" font-weight="bold">WT</text>
                      </svg>
                    }
                  </div>
                )
              })
            }
        </div>

        {/* the other nav components */}
        {
          currentNav === 0 ? 
          <AdminDashboard 
            approvedToonz={approvedToonz} 
            pendingToonz={pendingToonz} 
            rejectedToonz={rejectedToonz} 
            users={users} 
          /> : 
          currentNav === 1 ? 
          <AdminUsersTab 
            users={users} 
            setUsers={setUsers}
          /> : 
          currentNav === 2 ? 
          <AdminWebtoonsTab 
            toonz={toonz} 
            setToonz={setToonz}
          /> : 
          <AdminMessageTab 
            messages={messages} 
            setMessages={setMessages}
          />
        }

        <AddScripture />


    </section>
    </div>
  )
}
