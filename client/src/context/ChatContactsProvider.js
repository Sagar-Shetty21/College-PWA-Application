import React, {useContext, useState, useEffect} from 'react'
import useLocalStorage from '../utils/hooks/useLocalStorage'
import useAuth from '../utils/hooks/useAuth'

const ChatContactsContext = React.createContext()

export const useChatContacts = () => {
    return useContext(ChatContactsContext)
}

export const ChatContactsProvider = ({children}) => {
  const [contactsList, setContactsList] = useState([]);
  const {auth} = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/chat/get_available_contacts?id=${auth.student_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setContactsList(() => data.map(obj => ({
          id: `${obj.student_id ? obj.student_id : obj.staff_id}`,
          avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
          name: obj.name,
          section: obj.section,
          designation: obj.designation
        })))
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [auth]);

  const [chatContacts, setChatContacts] = useLocalStorage('chat_contacts',contactsList)

  const createChatContact = (id, name, recipients) => {
    const isContactExists = chatContacts.some(contact => contact.id === id);
    if (!isContactExists) {
      setChatContacts(prev => {
          return [...prev, {id, name, recipients}]
      })
    }
  }
  
  return (
    <ChatContactsContext.Provider value={{ chatContacts, createChatContact, contactsList, isLoading}}>
        {children}
    </ChatContactsContext.Provider>
  )
}
