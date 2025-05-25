import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserProvider'
import { BiSearch } from 'react-icons/bi'

export default function AdminUsersTab({users}) {
    const [subNav, setSubNav] = useState(["all", "admin", "authors", "banned"])
    const [currentNav, setCurrentNav] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const { user } = useUserContext()


  return (
    <div class="users-wrapper">
    <div class="searchbar-wrapper">
        <div className="left-items w-full max-w-[350px] mx-auto flex items-center justify-center gap-[10px] toons-search-filter-container relative">
            <div className='border border-gray-300 w-[250px] h-[35px] flex pl-[10px] rounded-[5px] items-center gap-[10px] text-gray-700'>
                <BiSearch className='h-full w-[20px] text-gray-500' size="10px"/>
                <input className='w-full h-full p-1 outline-0' onInput={() => {}} value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} placeholder='Search' />
            </div>
            <div 
                className='text-[#ff0000] border-[#ff0000] 
                border-[1px] p-[2px] w-[80px] rounded-[5px]  
                text-center cursor-pointer hover:bg-[#ff0000] 
                duration-300 ease-in-out transition-colors
                hover:text-white'
                onClick={() => {setIsFilterOpen(!isFilterOpen)}}
            >
                Filter
            </div>
            {
                isFilterOpen && (
                <div className='filter-list-cover right-0 absolute bg-white top-[40px] w-[100px] border-gray-300 border'>
                <div className="w-full h-full p-[20px] flex flex-col gap-[10px] justify-center items-center">
                    {
                        subNav.map((nav, index) => {
                        return (
                            <div className='text-gray-700 cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#ff0000]' 
                            onClick={() => setCurrentNav(index)}
                            key={index}
                            >
                            {nav}
                            </div>
                        )
                        })
                    }
                </div>
                </div>
                )
            }
        </div>
    </div>
    <div class="table-container">
        <table class="responsive-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Role</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="users-tb">
            {
                users.map((User, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1} </td>
                            <td>{User.type}</td>
                            <td>{User.name}</td>
                            <td>{User.email}</td>
                            <td>
                                {
                                    (User.status === 'active') ?
                                    <button class="btn ban u-btns" onclick='ban("{user._id}", "banned")'>Ban</button>
                                    :
                                    <button class="btn unban u-btns" onclick='ban("{user._id}", "active")'>Unban</button>
                                }
                                {
                                    (User.type === 'admin2' && user.type === 'admin1') ? <button class="btn ban u-btns" onclick='admin("{user._id}", "regular")' style={{backgroundColor: "red"}}>Remove Admin</button> 
                                    :
                                    ``
                                }

                                {
                                    (User.type === 'regular' && user.type === 'admin1') ?
                                    <button class="btn ban u-btns" onclick='admin("{user._id}", "admin2")' style={{backgroundColor: "green"}}>Make Admin</button>
                                    :
                                    ``
                                }
                                <br/>
                                <br/>
                                <span class="author-status">{ User.isAuthor ? 'Author' : '' }</span>
                            </td>
                        </tr>
                    )
                })
            }
          </tbody>
        </table>
      </div>
      
</div>
  )
}
