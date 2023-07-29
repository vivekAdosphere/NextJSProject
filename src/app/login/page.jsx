"use client"

import React,{useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

const LoginPage=()=>{
    const [user,setUser]= useState({
        username:"",
        email:"",
        password:""
        })

        const onLogin= async()=>{

        }

        return (
        <div className="w-full h-[100vh] bg-gray-800 flex justify-center items-center ">
            <div className="w-1/3 text-center space-y-4">
                <h1 className="font-medium text-xl text-white">Login</h1>
                <form action="" className="space-y-6 flex flex-col">
                    <div className="space-y-3 flex flex-col">
                    <input type="email" placeholder="Enter your email addres" required className="h-12 p-2 rounded text-black"/>
                    <input type="password" placeholder="Enter your password" className="h-12 p-2 rounded text-black"/>
                    </div>
                    <button type="submit" className="h-12 bg-green-700 rounded">Login</button>
                    <h6 className="text-white">Did not have an account ? <Link href="/signup" className="text-blue-600">Register here!</Link></h6>
                </form>
            </div>
            </div>
        )
}

export default LoginPage