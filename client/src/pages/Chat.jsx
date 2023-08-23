import React,{ useState } from 'react';
import './chat.css';
import ChatContainer from '../components/studyChat/ChatContainer';

const Chat = () => {

  const [chatList, setChatList] = useState([
    {
      id: '1234',
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      alt: 'kursat_avatar',
      title: 'Kursat',
      subtitle: "Why don't we go to the No Way Home movie this weekend ?",
      date: new Date(),
      unread: 3,
    },
    {
      id: '8768',
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      alt: 'kursat_avatar',
      title: 'minal',
      subtitle: "Why don't wee this weekend ?",
      date: new Date(),
      unread: 3,
    },
    {
      id: '8797',
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      alt: 'kursat_avatar',
      title: 'sagar',
      subtitle: "this weekend ?",
      date: new Date(),
      unread: 8,
    }
  ]);


  return (
    <div className="chat">
        <ChatContainer list={chatList}/>
    </div>
  )
}

export default Chat