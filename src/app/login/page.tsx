"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'




function page() {
 const router = useRouter()

    const [loading , setLoading] = React.useState(false)
    const [buttonDisabled , setButtonDisabled] = useState(false)
    const [user, setUser] = React.useState({
      email: "",
      password: "",
  
    })

    useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(false)
      }
      else{
        setButtonDisabled(true)
      }
    },[user])

    const onSignup = async () => {
    try {
      const response = await axios.post("api/users/login",user)
      toast.success("Login successful")
      router.push("/profile")
    } catch (error:any) {
      console.log("login failed",error)
      toast.error(error.message)
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen'>
      <h1>Login</h1>
      <hr />
      <div className='flex flex-col gap-2'>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email" 
          className='flex flex-col p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' 
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password" 
          className='flex flex-col p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' 
        />
        <button 
          onClick={onSignup}
          className='p-2 bg-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          {loading ? "wait a second" : "login"}
        </button>
        <Link href="/signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
  )
}

export default page