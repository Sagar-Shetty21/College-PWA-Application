import React, { useState } from 'react';
import './createQuery.css';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import useAuth from '../../utils/hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const CreateQuery = () => {

  const {auth} = useAuth();
  const [name,setName] = useState(auth.name);
  const [regId,setRegId] = useState(auth.student_id);
  const [sub,setSub] = useState(auth.name);
  const [desc,setDesc] = useState(auth.name);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/queries/add_new_query`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idNumber: regId,
              name: name,
              subject: sub,
              description: desc,
            })
          })
          .then(response => response.json())
          .then(data => {
              if(data.message) {
                toast.success(data.message)
                navigate("/queries");
              }
              else if(data.err.code === "ER_DUP_ENTRY") {
                toast.warning("User with this ID number already exists.")
              }else {
                toast.error("There was an error, please try again!")
              }
          })
  }

  return (
    <div className="form-container">
        <div className="create-query-heading">Create a new query!</div>
        <form onSubmit={handleSubmit} className="create-query-form">
        
                <label for="name">Name: <input required readonly disabled id="name" type="text" name="name" value={name}/></label>
                <label for="reg-no">Register ID: <input required readonly disabled id="reg-no" type="text" name="register number" value={regId}/></label>
                <label for="query-sub">Query Subject: <input required id="query-sub" type="text" placeholder="Short title for your query." name="query subject" onChange={(e) => setSub(e.target.value)} value={sub}/></label>
                <label for="query-desc">
                    Explain your query:
                    <textarea id="query-desc" rows="12" cols="30" required placeholder="I'am facing this problem..." onChange={(e) => setDesc(e.target.value)} name="query description" value={desc}></textarea>
                </label>

            <input type="submit" value="Submit"/>
            <Link to="/queries" ><input className="cancel-btn" type="button" value="Cancel"/></Link>
        </form>
    </div>
  )
}

export default CreateQuery