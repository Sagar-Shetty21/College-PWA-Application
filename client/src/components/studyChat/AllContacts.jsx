import React from 'react'
import { Link } from 'react-router-dom';
import { useChatContacts } from '../../context/ChatContactsProvider';
import LoadingScreen from '../../utils/LoadingScreen';

const AllContacts = () => {

  const { createChatContact, contactsList, isLoading } = useChatContacts();

  const addChatContact = (id, name) => {
    createChatContact(id, name)
  }

  if(isLoading){
    return <LoadingScreen />
  }

  return (
    <div className='all-contacts-page'>
      <div className='all-contacts-container'>
        {contactsList.map(obj => {
          return (
            <Link to={`/chat/${obj.id}`} key={obj.id} onClick={() => addChatContact(obj.id,obj.name)}>
              <div className="contact-card">  
                <img src={obj.avatar} alt="avatar" />
                <div className="contact-name">{obj.name}</div>
                <div className={obj.section ? "contact-section" : "contact-designation"}>{obj.section ? obj.section : obj.designation}</div>
              </div>
            </Link>
          )
        })}
      </div>
      <Link to="/chat">
          <div className="contact-page-back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
            </svg>
            <div>Go Back</div>
          </div>
      </Link>
    </div>
  )
}

export default AllContacts