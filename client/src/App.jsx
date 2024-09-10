import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/index'
import Chat from './pages/chat'
import Profile from './pages/profile'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/auth' element={<Auth/>} />
    <Route path='/chat' element={<Chat/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='*' element={<Navigate to="/auth" /> }/> //wild card route
  </Routes>
  </BrowserRouter>
  )
}

export default App
