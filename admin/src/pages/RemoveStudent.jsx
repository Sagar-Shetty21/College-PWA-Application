import React, {useState, useEffect} from 'react';
import './removeStaff.css';
import PopupModal from '../modals/popupModal';


const RemoveStudent = () => {
  
  const [tableData, setTableData] = useState([]);
  const [active, setActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/manage-users/allstudents`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTableData(data);
      })
      .catch(error => console.error(error));
  }, []);
  

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/manage-users/getstudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({ regno: search })
    })
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error(error))

  }

  const handleDelete = async () => {
    try {
      // Delete user
      const deleteResponse = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/manage-users/removestudent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ regno: selectedUser[1] })
      });
      const deleteData = await deleteResponse.json();
      console.log(deleteData);
  
      // Close the modal
      setActive(false);
  
      // Fetch updated data
      const fetchDataResponse = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/manage-users/allstudents`);
      const fetchData = await fetchDataResponse.json();
      setTableData(fetchData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="remove-staff-page">
      <div class="search-local">
        <div class="icon">
          <i class="fa-solid fa-magnifying-glass"/>
        </div>

        <input type="text" placeholder="Enter Register ID" onChange={(e) => setSearch(e.target.value)} value={search} />
        <button onClick={handleSearch}>
          <span>Search</span>
        </button>
      </div>

      <div className="table-container">
        <table>
          <tr>
            <th>Register ID</th>
            <th>Name</th>
            <th>Section</th>
            <th>Gender</th> 
          </tr>

          {tableData.map(item => {
            return(
                <tr key={item.student_id} onClick={() => {
                  setActive(true);
                  setSelectedUser([item.name,item.student_id]);
                }}>
                  <td>{item.student_id}</td>
                  <td>{item.name}</td>
                  <td>{item.section}</td>
                  <td>{item.gender}</td>
                </tr>
              )
            })}
        </table>
      </div>
      {active ? <PopupModal active bg="orange" toggleActive={() => setActive(!active)}>
        <h1>Are you sure you want to delete this user?</h1>
        <br/><br/>
        <h2>{selectedUser[0]}</h2>
        <button 
          onClick={handleDelete}
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px 20px',
            margin: '8px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Confirm
        </button>
      </PopupModal>:null}      
    </div>
  )
}

export default RemoveStudent