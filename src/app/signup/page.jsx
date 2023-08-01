"use client"

import React,{useEffect, useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage=()=>{
    const router=useRouter()
    const [user,setUser]= useState({
        username:"",
        email:"",
        password:""
        })

        const [loading,setLoading]= useState(false)
        const [errMessage,setErrResponseMessage]= useState("")
        const [sucMessage,setSucResponseMessage]= useState("")

        // toast notification for every response message
        useEffect(()=>{       
            if(sucMessage){
                toast.success(sucMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    setSucResponseMessage("")
            } else if(errMessage){
                toast.error(errMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    setErrResponseMessage("")
            }
        },[errMessage,sucMessage])

        const changeHandler= (name)=>(event)=>{
            const value= event.target.value

            setUser({...user,[name]:value})
        }

        const onSignup= async(event)=>{
            try{
                event.preventDefault()
                setLoading(true)
                const response = await axios.pos("/api/users/signup",user,{headers:{     'Content-Type': 'application/json',
                Accept: 'application/json'}})
              
                if(!response.data.success){
            
                    setErrResponseMessage(response.data.message)
                }else {
                    setSucResponseMessage(response.data.message)
                }
    
                router.push("/login")
            }catch(err){
                setErrResponseMessage(err.message)
            }finally{
                setLoading(false)
               
            }
            
          }

        return (
        <div className="w-full h-[100vh] bg-gray-800 flex justify-center items-center ">
            <div className="w-1/3 text-center space-y-4">
                <h1 className="font-medium text-xl text-white">Register Yourself!</h1>
                <form onSubmit={onSignup} className="space-y-6 flex flex-col">
                    <div className="space-y-3 flex flex-col">
                    <input type="text" onChange={changeHandler('username')} value={user.username} placeholder="Enter your name" required className="h-12 p-2 rounded text-black"/>
                    <input type="email" onChange={changeHandler("email")} value={user.email} placeholder="Enter your email address" required className="h-12 p-2 rounded text-black" />
                    <input type="password" onChange={changeHandler('password')} value={user.password} placeholder="Enter your password" required className="h-12 p-2 rounded text-black" />
                    </div>
                    <button type="submit" disabled={loading} className="h-12 bg-green-700 rounded text-white">Register</button>
                    <h6 className="text-white">Already an user ? <Link href="/login" className="text-blue-600">Login now!</Link></h6>

                </form>
            </div>
            <ToastContainer />
            </div>
        )
}

export default SignupPage