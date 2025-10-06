"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { set } from 'mongoose'

export default function verifyEmailPage() {
    const [token ,setToken] = useState("")
    const[verified , setVerified] = useState(false)
    const [error , setError] = useState(false)

    const verifyUserEmail = async ()=>{

        try {
            const response = await axios.post("/api/users/verifyEmail",{token})
            setVerified(true)
            console.log("email verified",response.data.message)
            
    }
    catch (error:any) {
        setError(true)
        console.log("email verification failed",error.response.data.message)
        toast.error(error.response.data.message)}
    
    }
    useEffect(()=>{
        const urlToken = window.location.search.split('token=')[1]
        if(urlToken){
            setToken(urlToken || "")
        }
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])

    return(
        <div className='flex flex-col gap-2 items-center justify-center h-screen'>
            
                
                    <div className='flex flex-col gap-2 items-center justify-center h-screen'>
                        <h1 className='text-2xl font-bold'>verify email</h1>
                        <p className='text-gray-600'>{`${token}` ? token : "no token available"}</p>
                    </div>
              
                    <div className='flex flex-col gap-2 items-center justify-center h-screen'>
                       
                        {verified && <p className='text-green-600'>Email verified successfully, you can now <Link href="/login" className='text-blue-600 underline'>login</Link></p>}
                        {error && <p className=' text-2xl text-red-600'>Email verification failed, please try again</p>}
                    </div>
               
          
            </div>
    )
}