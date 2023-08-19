import React, { useState } from 'react';
import "./addStaff.css"


const AddStaff = () => {

  const [regId,setRegId] = useState('');
  const [name,setName] = useState('');
  const [designation,setDesignation] = useState('');
  const [gender,setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/manage-users/addstaff`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            regId,
            name,
            designation,
            gender
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.log(data.error.code)
            alert("Server Error!")
          }else {
            console.log(data,"here")
          }
        })
  }

  return (
    <div className="page-body">
      <h1>Add a new staff</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>

          <label for="regId">Registration ID</label>
          <input type="text" id="regId" name="regId" required onChange={(e) => setRegId(e.target.value)} value={regId}/>

          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" required onChange={(e) => setName(e.target.value)} value={name}/>

          <label for="designation">Designation</label>
          <select id="designation" name="designation" required onChange={(e) => setDesignation(e.target.value)} value={designation}>
            <option value="">Choose Designation</option>
            <option value="Principle">Principle</option>
            <option value="Senior Professor">Senior Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
          </select>

          <label for="gender">Gender</label>
          <select id="gender" name="gender" required onChange={(e) => setGender(e.target.value)} value={gender}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input type="submit" value="Add Staff" />
        </form>
      </div>
    </div>
  )
}

export default AddStaff