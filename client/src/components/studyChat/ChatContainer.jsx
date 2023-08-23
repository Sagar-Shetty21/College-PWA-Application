import React, { useState } from 'react';
import "react-chat-elements/dist/main.css";
import { ChatList } from "react-chat-elements"
import { useNavigate } from 'react-router';

const ChatContainer = ({list}) => {

  const navigate = useNavigate();

  const handleClick = (id) => {
    const route = `/chat/${id}`;
    navigate(route);
  }

  return (
    <div className='chat-box-container'>
        <ChatList
          className='chat-list'
          dataSource={list}
          onClick={(e) => handleClick(e.id)}
        />
    </div>
  )
}

export default ChatContainer;