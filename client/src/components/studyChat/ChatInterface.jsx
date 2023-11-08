import React,{useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Avatar } from "react-chat-elements";
import { MessageList } from "react-chat-elements"

import { io } from "socket.io-client"

const ChatInterface = () => {

  const [textareaValue, setTextareaValue] = useState('');
  const [chatData, setChatData] = useState([
        {
        position:"left",
        type:"text",
        title:"UserName",
        text:"Hii",
        },
        {
        position:"right",
        type:"text",
        title:"Me",
        text:"Hello there!",
        },
    ])

  const { id } = useParams();

  /* const socket = io('http://localhost:3002')
  socket.on("connect", () => {
    console.log(`you are now conn ${socket.id}`)
  }) */

  const autoResize = (event) => {
    const textarea = event.target;
    //textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
    if (textarea.value === '') {
        textarea.style.height = '38px';
    }
  };

  const sendMessage = () => {
    const chatData = {
        position:"right",
        type:"text",
        title:"Me",
        text:textareaValue,
    }
    setChatData(data => [...data, chatData])
    setTextareaValue("");
  }

  return (
    <div className="chat-interface-container">
        <div className="chat-topbar">
            <div className="chat-room-info">
                <div className="chat-avatar">
                    <Avatar
                        src="../assets/user-chat-default.png"
                        alt="avatar"
                        size="xlarge"
                        type="rounded"
                    />
                </div>
                <div className="chat-room-name">UserName</div>
            </div>
            <Link to="/chat">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </Link>
        </div>
        <div className="chat-message-container">
           <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={chatData}
            />
        </div>
        <div className="message-input-field">
            <textarea
                value={textareaValue}
                placeholder="Type here..."
                onChange={(e) => {
                    setTextareaValue(e.target.value);
                    autoResize(e);
                }}
            ></textarea>
            {textareaValue === "" ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>:
                <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
            }
        </div>
    </div>
  )
}

export default ChatInterface