import React,{useState} from 'react'
import "./addStaff.css"


const AddStudent = () => {

  const [regId,setRegId] = useState('');
  const [name,setName] = useState('');
  const [section,setSection] = useState('');
  const [gender,setGender] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/manage-users/addstudent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            regId,
            name,
            section,
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
      <h1>Add a new student</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>

          <label for="regId">Registration ID</label>
          <input type="text" id="regId" name="regId" required onChange={(e) => setRegId(e.target.value)} value={regId}/>

          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" required onChange={(e) => setName(e.target.value)} value={name}/>

          <label for="section">Section</label>
          <select id="section" name="section" required onChange={(e) => setSection(e.target.value)} value={section}>
            <option value="">Choose section</option>
            <option value="BCOM">BCOM</option>
            <option value="BBA">BBA</option>
            <option value="BCA">BCA</option>
          </select>

          <label for="gender">Gender</label>
          <select id="gender" name="gender" required onChange={(e) => setGender(e.target.value)} value={gender}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="submit" value="Add Student" />
        </form>
      </div>
    </div>
  )
}

export default AddStudent