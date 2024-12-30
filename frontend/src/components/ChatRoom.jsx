import styles from '../styles/chatRoom.module.css'
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import {io} from 'socket.io-client'

const URL = 'http://localhost:3000'
const socket = io(URL)


function ChatRoom() {
  //state variables
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")

  //handles recieving messages from socket.io
  useEffect(() => {


    const handleRecieving = (message) => {
      setMessages(messages => [...messages, message])
      console.log("message recieved")
    }

    socket.on('recieving',handleRecieving)
    return () => socket.off('recieving', handleRecieving)

  }, [])

//handles sending texts
  const handleSubmit = (e) => {
    e.preventDefault()   
    
    const newMessage = {
      id: messages.length + 1,
      value: inputValue,
      style: 'sending'
    }

    socket.emit('sending', newMessage)

    setMessages(messages => [...messages, newMessage])
    setInputValue("")
  }

  const handleChange = (e) => {
    const value = e.target.value
    setInputValue(value)
  }




  return (
    <>
      <div className={styles.parent}>
      <div className={styles.groupChats}> </div>
      <div className={styles.groupSearch}> </div>
        <div className={styles.messageContainer}>
          <ul>
            {messages.map((message) => <li key={message.id} className={message.style == 'sending'? styles.sending: styles.recieving}>{message.value}</li>)}
          </ul>
        </div>
        <div className={styles.textbar}>
          <form action="">
            <input type="text" name="textbar" id="textbar" value={inputValue} onChange={handleChange} placeholder='type something...'/>
            <button type="submit" onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane} /></button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChatRoom
