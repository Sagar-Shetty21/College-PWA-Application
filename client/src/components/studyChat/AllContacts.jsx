import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const AllContacts = () => {

  const [contactsList, setContactsList] = useState([
    {
      id: '1234',
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      name: 'Kursat',
      section: "BBA"
    },
    {
      id: '8768',
      avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      name: 'minal',
      section: "BCA"
    },
    {
      id: '8797',
      avatar: 'data:image/jpeg;base64,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',
      name: 'Amarnath Reddy',
      designation: "principal"
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/chat/get_available_contacts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        setContactsList(() => data.map(obj => ({
          id: `${obj.student_id ? obj.student_id : obj.staff_id}`,
          avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
          name: obj.name,
          section: `${obj.section ? obj.section : obj.designation}`
        })))
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);



  return (
    <div className='all-contacts-page'>
      <div className='all-contacts-container'>
        {contactsList.map(obj => {
          return (
            <Link to={`/chat/${obj.id}`}>
              <div key={obj.id} className="contact-card">  
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