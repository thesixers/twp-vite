import React, { useState } from 'react'
import { useUserContext } from '../../context/UserProvider'
import { BiSearch } from 'react-icons/bi'

export default function AdminUsersTab({ users }) {
  const [subNav, setSubNav] = useState(["all", "admin", "authors", "banned"])
  const [currentNav, setCurrentNav] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { user } = useUserContext()

  return (
    <div className="users-wrapper p-4">
      {/* Search & Filter */}
      <div className="searchbar-wrapper mb-6 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center border border-gray-300 w-[280px] h-[40px] px-3 rounded-md">
          <BiSearch className="text-gray-500 mr-2" />
          <input
            className="w-full outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
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
                onClick={() => setCurrentNav(index)}
              >
                {nav}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users
          .filter((u) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((User, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* User Info */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {User.name}
                </h3>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    User.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {User.status}
                </span>
              </div>

              <p className="text-sm text-gray-500">{User.email}</p>
              <p className="text-sm font-medium text-gray-700">
                Role:{" "}
                <span className="capitalize text-orange-600">{User.type}</span>
              </p>
              {User.isAuthor && (
                <p className="text-xs text-blue-600 font-semibold">Author</p>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-2">
                {User.status === "active" ? (
                  <button className="px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200 text-xs font-medium">
                    Ban
                  </button>
                ) : (
                  <button className="px-3 py-1 rounded-md bg-green-100 text-green-600 hover:bg-green-200 text-xs font-medium">
                    Unban
                  </button>
                )}

                {User.type === "admin2" && user.type === "admin1" && (
                  <button className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 text-xs font-medium">
                    Remove Admin
                  </button>
                )}

                {User.type === "regular" && user.type === "admin1" && (
                  <button className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 text-xs font-medium">
                    Make Admin
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
