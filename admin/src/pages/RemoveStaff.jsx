import React, {useState, useEffect} from 'react'
import './removeStaff.css'

const RemoveStaff = () => {


  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/manage-users/allstaffs')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }, []);

  const [search, setSearch] = useState('');

  

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search)
    fetch('http://localhost:8080/manage-users/removestaff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({ regno: search })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))

  }

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
            <th>Name</th>
            <th>Register ID</th>
            <th>Designation</th>
            <th>Gender</th> 
          </tr>

          <tr>
            <td>Rohan</td>
            <td>R2103511</td>
            <td>Professer</td>
            <td>Male</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default RemoveStaff