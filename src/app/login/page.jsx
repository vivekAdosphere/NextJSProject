"use client"

import React,{useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

const LoginPage=()=>{
    const [user,setUser]= useState({
        email:"",
        password:""
        })

        const [loading,setLoading]= useState(false)
        const [errMessage,setErrResponseMessage]= useState("")
        const [sucMessage,setSucResponseMessage]= useState("")

        const onLogin= async(event)=>{
            try{
                event.preventDefault()
                setLoading(true)
                const response = await axios.post("/api/users/login",user,{headers:{     'Content-Type': 'application/json',
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

        const changeHandler=(name)=> (event)=>{
            const value= event.target.value
            setUser({...user,[name]:value})
        }

        return (
        <div className="w-full h-[100vh] bg-gray-800 flex justify-center items-center ">
            <div className="w-1/3 text-center space-y-4">
                <h1 className="font-medium text-xl text-white">Login</h1>
                <form onSubmit={onLogin} className="space-y-6 flex flex-col">
                    <div className="space-y-3 flex flex-col">
                    <input type="email" onChange={changeHandler('email')} placeholder="Enter your email addres"value={user.email} required className="h-12 p-2 rounded text-black"/>
                    <input type="password" onChange={changeHandler('password')} placeholder="Enter your password" value={user.password} className="h-12 p-2 rounded text-black"/>
                    </div>
                    <button type="submit" className="h-12 bg-green-700 rounded">Login</button>
                    <h6 className="text-white">Did not have an account ? <Link href="/signup" className="text-blue-600">Register here!</Link></h6>
                </form>
            </div>
            </div>
        )
}

export default LoginPage