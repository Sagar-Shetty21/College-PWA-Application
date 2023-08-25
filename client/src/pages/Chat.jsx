import React,{ useEffect, useState } from 'react';
import './chat.css';
import ChatContainer from '../components/studyChat/ChatContainer';
import { useChatContacts } from '../context/ChatContactsProvider';

const Chat = () => {

  const { chatContacts } = useChatContacts();

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
    <div className="chat">
        <ChatContainer list={chatContactList}/>
    </div>
  )
}

export default Chat