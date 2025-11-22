import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";
import { Mail, Users, LayoutDashboard, Menu, X } from "lucide-react";
import AdminDashboard from "../components/AdminDashboard";
import AdminUsersTab from "../components/AdminUsersTab";
import AdminWebtoonsTab from "../components/AdminWebtoonsTab";
import AdminMessageTab from "../components/AdminMessageTab";
import axios from "axios";
import AddScripture from "../components/AddScripture";
import { serverUrl } from "../../requests/apicalls";

export default function Admin() {
  const { user, setUser } = useUserContext();
  const adminNav = ["dashboard", "users", "webtoons", "messages"];
  const [currentNav, setCurrentNav] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [toonz, setToonz] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [approvedToonz, setApprovedToonz] = useState([]);
  const [pendingToonz, setPendingToonz] = useState([]);
  const [rejectedToonz, setRejectedToonz] = useState([]);

  useEffect(() => {
    if (!user || !user.type.includes("admin")) navigate("/");

    const fetchStuff = async () => {
      try {
        let res = await axios.get(`${serverUrl}/twp/admin`, {
          withCredentials: true,
        });
        if (res.data.toonz) setToonz(res.data.toonz);
        if (res.data.users) setUsers(res.data.users);
        if (res.data.messages) setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
        if (error.response) {
          let status = error.response.status;
          if (status === 401 || status === 403) {
            setUser(null);
            navigate("/");
          }
        }
      }
    };

    fetchStuff();
  }, [user]);

  useEffect(() => {
    setApprovedToonz(toonz.filter((toon) => toon.status === "approved"));
    setPendingToonz(toonz.filter((toon) => toon.status === "pending"));
    setRejectedToonz(toonz.filter((toon) => toon.status === "rejected"));
  }, [toonz]);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-gray-800 p-6 flex-col">
        <h1 className="text-2xl font-bold text-[#e44616] mb-8">Admin Panel</h1>
        <nav className="flex flex-col space-y-4">
          {adminNav.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrentNav(index)}
              className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
                currentNav === index
                  ? "bg-[#e44616] text-white"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
            >
              {item === "dashboard" ? (
                <LayoutDashboard size={20} />
              ) : item === "users" ? (
                <Users size={20} />
              ) : item === "messages" ? (
                <Mail size={20} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M10 10h80v60H50l-15 15v-15H10V10z" />
                  <text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    fill="white"
                    fontSize="22px"
                    fontFamily="Arial, sans-serif"
                    fontWeight="bold"
                  >
                    WT
                  </text>
                </svg>
              )}
              <span className="capitalize">{item}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          {/* Sidebar */}
          <aside className="relative z-50 w-64 bg-gray-800 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-[#e44616]">Admin Panel</h1>
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} className="text-gray-300" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {adminNav.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentNav(index);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentNav === index
                      ? "bg-[#e44616] text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {item === "dashboard" ? (
                    <LayoutDashboard size={20} />
                  ) : item === "users" ? (
                    <Users size={20} />
                  ) : item === "messages" ? (
                    <Mail size={20} />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M10 10h80v60H50l-15 15v-15H10V10z" />
                      <text
                        x="50%"
                        y="55%"
                        textAnchor="middle"
                        fill="white"
                        fontSize="22px"
                        fontFamily="Arial, sans-serif"
                        fontWeight="bold"
                      >
                        WT
                      </text>
                    </svg>
                  )}
                  <span className="capitalize">{item}</span>
                </div>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-900 w-full">
        {/* Mobile Topbar */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#e44616]">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={28} className="text-gray-300" />
          </button>
        </div>

        {currentNav === 0 ? (
          <AdminDashboard
            approvedToonz={approvedToonz}
            pendingToonz={pendingToonz}
            rejectedToonz={rejectedToonz}
            users={users}
          />
        ) : currentNav === 1 ? (
          <AdminUsersTab users={users} setUsers={setUsers} />
        ) : currentNav === 2 ? (
          <AdminWebtoonsTab toonz={toonz} setToonz={setToonz} />
        ) : (
          <AdminMessageTab messages={messages} setMessages={setMessages} />
        )}

        <div className="mt-6">
          <AddScripture />
        </div>
      </main>
    </div>
  );
}
