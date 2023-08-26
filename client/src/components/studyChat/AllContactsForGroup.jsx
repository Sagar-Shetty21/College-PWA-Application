import React, {useState, useEffect} from 'react'
import { useChatContacts } from '../../context/ChatContactsProvider';
import { Link } from 'react-router-dom';

const AllContactsForGroup = () => {
  const { createChatContact, contactsList } = useChatContacts();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');

  const toggleContactSelection = (id, name) => {
    setSelectedContacts(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(contactId => contactId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const createGroupFromSelected = () => {
    // Here you can use the selectedContacts array to create a group
    setIsModalOpen(true);
    console.log("Selected Contacts:", selectedContacts);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setGroupName(''); // Reset group name when modal is closed
  };

  const handleCreateGroup = () => {
    // ... your code to create the group with selectedContacts and groupName ...
    setIsModalOpen(false);
    console.log(groupName)
    setGroupName(''); // Reset group name
  };

  return (
    <div className='all-contacts-page'>
      <div className='all-contacts-container'>
        {contactsList.map(obj => (
          <div
            key={obj.id}
            className={`contact-card ${selectedContacts.includes(obj.id) ? 'selected' : ''}`}
          >
            <img src={obj.avatar} alt="avatar" />
            <div className="contact-name">{obj.name}</div>
            <div className={obj.section ? "contact-section" : "contact-designation"}>
              {obj.section ? obj.section : obj.designation}
            </div>
            <div onClick={() => toggleContactSelection(obj.id,obj.name)} className="select-deselect-icon">
              {selectedContacts.includes(obj.id) ? 
                <svg color='green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
                : 
                <svg color='purple' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            </div>
          </div>
        ))}
      </div>
      <div className="create-group-btns">
          <Link to="/chat">
              <button className="create-group-back-btn">
                  Go Back
              </button>
          </Link>
          <button className="create-chat-group-btn" onClick={createGroupFromSelected} disabled={selectedContacts.length === 0}>
              Create Group
          </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button onClick={handleCreateGroup}>Create</button>
            <button onClick={handleModalClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};



export default AllContactsForGroup