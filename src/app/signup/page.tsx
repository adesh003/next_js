"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
function page() {

  const router = useRouter()
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",

  })

  const [loading , setLoading] = useState(false)

  const[ buttonDisabled , setButtonDisabled] = useState(false)
  const onSignup = async () => {
    try {
      setLoading(true);
     const response =  await axios.post("/api/users/signup",user)
     console.log(response.data) 
     toast.success("User created successfully")
      router.push("/login")
   
    } catch (error:any) {
      console.log("signup Failed",error)
      toast.error(error.message)
      
    }
    finally{
      setLoading(false)
    }
 
  }
useEffect(()=>{

  if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
    setButtonDisabled(false)
  }
  else
  setButtonDisabled(true)

},[user])

  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen'>
      <h1>{loading ? "Loading" :"Sign Up"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        onChange={(e) => setUser({ ...user, username: e.target.value })}

        type="text" id="username" className='p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' />
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="email" id="email" className='p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}

        type="password" id="password" className='p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' />
      <button
        onClick={onSignup}
        className='p-2 bg-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'>{buttonDisabled ? "No Signup":"Sign Up"}</button>
        <Link href='/login' > login here</Link>
    </div>
  )
}

export default page