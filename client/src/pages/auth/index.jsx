import React, { useState } from "react";
import Background from "@/assets/login3.png";
import Victory from "@/assets/victory.svg";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {apiClient} from "@/lib/api-client.js"
import { SIGNUP_ROUTE,LOGIN_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
 
function Auth() {
  const naviage = useNavigate()
  const { setUserInfo } = useAppStore()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const validateLogin = ()=>{
    if(!email.length){
      toast.error("Email is required.")
      return false
    }
    if(!password.length){
      toast.error("Password is required.")
      return false
    }
    return true
  }

  const validateSignup = () =>{
    if(!email.length){
      toast.error("Email is required.")
      return false
    }
    if(!password.length){
      toast.error("Password is required.")
      return false
    }
    if (password !== confPassword) {
      toast.error("Password and Confirm Password must match.")
      return false
    }
    return true
  }

  const handleLogin = async () => {
    if(validateLogin()){
      const response = await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true})
      console.log(response);
      if (response.data.id) {
        
        
        setUserInfo(response.data)
        if(response.data.profileSetup) naviage("/chat")
          else naviage("/profile")
      }
      
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true})
      console.log(response);
      if(response.status === 201){
        setUserInfo(response.data.user)
        naviage("/profile")
      }
      
    }
  }; 

  return (
    <div className="h-[100vh]  bg-[#1c1d25] w-[100vw] flex items-center justify-center">
      <div className="h-[90vh] bg-[#2f303b]  border-slate-200 text-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fil in the details to get started with the SpiceChat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login" >
              <TabsList className="flex w-full">
                <TabsTrigger
                  value="login"
                  className="
                    w-1/2 
                    p-3 
                    text-white 
                    text-opacity-70 
                    border-b-2 
                    border-transparent 
                    rounded-none 
                    transition-all 
                    duration-300 
                    data-[state=active]:bg-transparent 
                    data-[state=active]:text-white 
                    data-[state=active]:text-opacity-100 
                    data-[state=active]:font-semibold 
                    data-[state=active]:border-b-purple-500
                  "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="
                    w-1/2 
                    p-3 
                    text-white 
                    text-opacity-70 
                    border-b-2 
                    border-transparent 
                    rounded-none 
                    transition-all 
                    duration-300 
                    data-[state=active]:bg-transparent 
                    data-[state=active]:text-white 
                    data-[state=active]:text-opacity-100 
                    data-[state=active]:font-semibold 
                    data-[state=active]:border-b-purple-500
                  "
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10 border-white" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6 text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6 hover:opacity-80 " onClick={handleLogin}>
                  Login{" "}
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 " value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6  text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6 text-black"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
                <Button className="rounded-full p-6 hover:opacity-80" onClick={handleSignup}>
                  SignUP 
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center"> 
          <img src= {Background} alt="Background Image" className="h-[400px] w-[600px] " />
        </div>
      </div>
    </div>
  );
}

export default Auth;
