import React,{ useEffect, useState } from 'react';
import './chat.css';
import ChatContainer from '../components/studyChat/ChatContainer';
import { useChatContacts } from '../context/ChatContactsProvider';
import useAuth from '../utils/hooks/useAuth';
import { SocketProvider } from '../context/SocketProvider'

const Chat = () => {

  const { chatContacts } = useChatContacts();
  const { auth } = useAuth();

  const [chatContactList, setChatContactList] = useState([]);

  useEffect(() => {
    setChatContactList(() => {
      const list = [];
      chatContacts.map((obj) => {
        list.push({
          id: obj.id,
          avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
          alt: 'avatar',
          title: obj.name,
          subtitle: "this weekend ?",
          date: new Date(),
          unread: 0,
        })
      })
      return list
    })
  },[chatContacts])


  return (
    <SocketProvider id={auth.student_id ? auth.student_id : auth.staff_id}>
      <div className="chat">
          <ChatContainer list={chatContactList}/>
      </div>
    </SocketProvider>
  )
}

export default Chat