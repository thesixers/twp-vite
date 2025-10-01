import axios from 'axios'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export default function AdminWebtoonsTab({ toonz, setToonz }) {
  const [subNav, setSubNav] = useState(["all", "pending", "rejected"])
  const [currentNav, setCurrentNav] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const navigate = useNavigate()

  const ans = async (id, status) => {
    try {
      let res = await axios.put(
        'https://twp2.onrender.com/twp/admin/updatetoon',
        { id, status },
        { withCredentials: true }
      )

      let { E, toons } = res.data
      if (E) alert(E)
      if (toons) setToonz(toons)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="webtoonz-wrapper p-4">
      {/* Search & Filter */}
      <div className="searchbar-wrapper mb-6 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center border border-gray-300 w-[280px] h-[40px] px-3 rounded-md">
          <BiSearch className="text-gray-500 mr-2" />
          <input
            className="w-full outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search webtoons..."
          />
        </div>

        <div
          className="text-[#ff0000] border-[#ff0000] border px-4 py-1 rounded-md text-center cursor-pointer 
          hover:bg-[#ff0000] hover:text-white transition-colors"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filter
        </div>

        {isFilterOpen && (
          <div className="absolute mt-[200px] right-4 bg-white shadow-md rounded-md border p-3 z-50">
            {subNav.map((nav, index) => (
              <div
                key={index}
                className={`cursor-pointer py-1 px-2 rounded-md transition-colors ${
                  currentNav === index
                    ? "bg-[#ff0000] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setCurrentNav(index)
                  setIsFilterOpen(false)
                  setSearchTerm('')
                }}
              >
                {nav}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Webtoons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toonz
          .filter((toon) =>
            (subNav[currentNav] !== "all"
              ? toon.status === subNav[currentNav]
              : true) &&
            toon.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((toon, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Info */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {toon.title}
                </h3>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    toon.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : toon.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {toon.status}
                </span>
              </div>

              <p className="text-sm text-gray-500">Author: {toon.author}</p>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  className="px-3 py-1 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 text-xs font-medium"
                  onClick={() => navigate(`/webtoon/${toon._id}`)}
                >
                  View
                </button>

                {toon.status === "pending" ? (
                  <>
                    <button
                      className="px-3 py-1 rounded-md bg-green-100 text-green-600 hover:bg-green-200 text-xs font-medium"
                      onClick={() => ans(toon._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200 text-xs font-medium"
                      onClick={() => ans(toon._id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : toon.status === "rejected" ? (
                  <button
                    className="px-3 py-1 rounded-md bg-green-100 text-green-600 hover:bg-green-200 text-xs font-medium"
                    onClick={() => ans(toon._id, "approved")}
                  >
                    Approve
                  </button>
                ) : (
                  <button
                    className="px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200 text-xs font-medium"
                    onClick={() => ans(toon._id, "rejected")}
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
