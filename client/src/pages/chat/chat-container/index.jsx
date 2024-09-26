import React from 'react'
import ChatHeader from './components/ChatHeader'
import MessageBar from './components/MessageBar'
import MessageContainer from './components/MessageContainer'
import { useAppStore } from '@/store'

function ChatContainer() {
  const { selectedChatType } = useAppStore()

  return (
    <div className={`
      flex flex-col bg-[#1c1d25]
      fixed inset-0 z-10
      md:static md:flex-1 md:z-auto
      transition-all duration-300 ease-in-out
      ${selectedChatType ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
    `}>
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  )
}

export default ChatContainer