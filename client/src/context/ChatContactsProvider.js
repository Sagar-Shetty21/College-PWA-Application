import React, {useContext} from 'react'
import useLocalStorage from '../utils/hooks/useLocalStorage'

const ChatContactsContext = React.createContext()

export const useChatContacts = () => {
    return useContext(ChatContactsContext)
}

export const ChatContactsProvider = ({children}) => {
  const [chatContacts, setChatContacts] = useLocalStorage('chat_contacts',[])

  const createChatContact = (id, name) => {
    const isContactExists = chatContacts.some(contact => contact.id === id);
    if (!isContactExists) {
      setChatContacts(prev => {
          return [...prev, {id, name}]
      })
    }
  }
  
  return (
    <ChatContactsContext.Provider value={{ chatContacts, createChatContact}}>
        {children}
    </ChatContactsContext.Provider>
  )
}
