"use client"

import React,{useState} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

const SignupPage=()=>{
    const router=useRouter()
    const [user,setUser]= useState({
        username:"",
        email:"",
        password:""
        })

        const [loading,setLoading]= useState(false)

        const changeHandler= (name)=>(event)=>{
            const value= event.target.value

            setUser({...user,[name]:value})
        }

        const onSignup= async(event)=>{
            try{
                event.preventDefault()
                setLoading(true)
                const response = await axios.post("/api/users/signup",user,{headers:{     'Content-Type': 'application/json',
                Accept: 'application/json'}})
                console.log("singup success: "+ response.data)
    
                router.push("/login")
            }catch(err){
                console.log(err.message)
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
                    <button type="submit" className="h-12 bg-green-700 rounded text-white">Register</button>
                    <h6 className="text-white">Already an user ? <Link href="/login" className="text-blue-600">Login now!</Link></h6>

                </form>
            </div>
            </div>
        )
}

export default SignupPage