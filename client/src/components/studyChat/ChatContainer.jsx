import React,{useState} from 'react';
import "react-chat-elements/dist/main.css";
import { ChatList } from "react-chat-elements"

const ChatContainer = () => {

  const [chatList, setChatList] = useState([
    {
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      alt: 'kursat_avatar',
      title: 'Kursat',
      subtitle: "Why don't we go to the No Way Home movie this weekend ?",
      date: new Date(),
      unread: 3,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      alt: 'kursat_avatar',
      title: 'minal',
      subtitle: "Why don't wee this weekend ?",
      date: new Date(),
      unread: 3,
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      alt: 'kursat_avatar',
      title: 'sagar',
      subtitle: "this weekend ?",
      date: new Date(),
      unread: 8,
    }
  ]);

  return (
    <div className='chat-box-container'>
        <ChatList
          className='chat-list'
          dataSource={chatList} />
    </div>
  )
}

export default ChatContainer;