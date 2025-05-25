import axios from 'axios'
import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../requests/apicalls'

export default function AdminWebtoonsTab({toonz, setToonz}) {
    const [subNav, setSubNav] = useState(["all", "pending", "rejected"])
    const [currentNav, setCurrentNav] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const navigate = useNavigate()


    const ans = async (id, status) => {
        console.log(id, status)
        const req = {id, status}
        try {
            let res = await axios.put(`${serverUrl}/twp/admin/updatetoon`, req, { withCredentials: true})

            let {E,toons} = res.data;

            if(E) alert(E);

            if(toons) setToonz(toons)
        } catch (error) {
            alert(error)
        }
    }



  return (
    <div className="webtoonz-wrapper">

    <div className="searchbar-wrapper">
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
                                    onClick={() => {
                                        setCurrentNav(index)
                                        setIsFilterOpen(false)
                                        setSearchTerm('');
                                        console.log(subNav[currentNav])
                                    }}
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
    <div className="table-wrapper">
        <div className="table-container">
            <table className="responsive-table">
            <thead>
            <tr>
            <th>SN</th>
            <th>Name of Webtoonz</th>
            <th>Author</th>
            <th>Action</th>
            </tr>
            </thead>
            <tbody className="webtoonzTable">
                {
                    toonz.filter(toon => (subNav[currentNav] !== "all" ? toon.status === subNav[currentNav] : true)).map((toon,index)=>{


                        return(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{toon.title}</td>
                                    <td>{toon.author}</td>
                                    <td>
                                    <button 
                                    className="btn view wb-view"
                                    onClick={() => {navigate(`/webtoon/${toon._id}`)}}
                                     >
                                        View
                                    </button>
                                        {
                                            toon.status === 'pending' ?
                                             <>
                                                <button className="btn approve wb-approve" onClick={() => ans(toon._id, "approved")}>Approve</button>
                                                <button className="btn reject wb-reject" onClick={() => ans(toon._id, "rejected")}>Reject</button> 
                                             </>
                                             : toon.status === 'rejected' ?
                                              <button className="btn approve wb-approve" onClick={() => ans(toon._id, "approved")}>Approve</button> 
                                              : <button className="btn reject wb-reject" onClick={() => ans(toon._id, "rejected")}>Reject</button>
                                              }
                                    </td>
                                </tr>
                            )
                    })
                }
            </tbody>
            </table>
            </div>
    </div> 
        
</div>
  )
}
