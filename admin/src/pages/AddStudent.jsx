import React from 'react'
import "./addStaff.css"


const AddStudent = () => {



  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div className="page-body">
      <h1>Add a new student</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>

          <label for="regId">Registration ID</label>
          <input type="text" id="regId" name="regId" required />

          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" required />

          <label for="section">Section</label>
          <select id="section" name="section" required >
            <option value="">Choose section</option>
            <option value="BCOM">BCOM</option>
            <option value="BBA">BBA</option>
            <option value="BCA">BCA</option>
          </select>

          <label for="gender">Gender</label>
          <select id="gender" name="gender" required >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="submit" value="Add Staff" />
        </form>
      </div>
    </div>
  )
}

export default AddStudent