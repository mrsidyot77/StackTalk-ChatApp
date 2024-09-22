import { useAppStore } from '@/store'
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import ContactsContainer from './contacts-container'
import ChatContainer from './chat-container'
import EmptyChatContainer from './empty-chat-container'

function Chat() {

  const {userInfo} = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      toast("PLease set up your profile first to continue.")
      navigate("/profile")
    }
  }, [userInfo])
  

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
     <ContactsContainer /> 
     {/* <EmptyChatContainer /> */}
     {/* <ChatContainer /> */}
    </div>
  )
}

export default Chat
