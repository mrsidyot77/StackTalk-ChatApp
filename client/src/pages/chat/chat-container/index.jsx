import React from 'react'
import ChatHeader from './components/ChatHeader'
import MessageBar from './components/MessageBar'
import MessageContainer from './components/MessageContainer'

function ChatContainer() {
  return (
    <div className='flex fixed h-[100vh] w-[100vh] bg-[#1c1d25] flex-col md:static md:flex-1'>
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  )
}

export default ChatContainer

