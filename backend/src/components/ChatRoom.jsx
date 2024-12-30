import styles from '../styles/chatRoom.module.css'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'






function ChatRoom() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")



  const handleSubmit = (e) => {
    e.preventDefault()   
    
    const newMessage = {
      id: messages.length + 1,
      value: inputValue
    }

    setMessages([...messages, newMessage])
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
            {messages.map((message) => <li key={message.id} className={message.value[message.value.length - 1] == '_'? styles.recieving:styles.sending}>{message.value}</li>)}
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
