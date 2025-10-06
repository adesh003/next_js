"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function page() {
  const router = useRouter()
  const [data, setData] = useState("nothing")
  const logoutBtn = async () => {
    const response = await axios.get("/api/users/logout")
    if (response.status === 200) {
      toast.success("Logout successful")
      router.push("/login")
    }
  }

  const getUserDetail = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res)
    setData(res.data.data)
  }
  useEffect(() => {
    getUserDetail()
  }, [])
  return (
    <div className='flex flex-col items-center justify-center mt-10'>Profile
      <p> email <h1 className='text-amber-700'>{data?.email}</h1></p>
      <h1> userName <h2  className='text-amber-700'>{data?.username}</h2></h1>
      <button
        onClick={logoutBtn}
        className='p-2 bg-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
      >Logout</button>

    </div>
  )
}

export default page