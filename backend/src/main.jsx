import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ChatRoom from './components/ChatRoom.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatRoom />
  </StrictMode>
)
