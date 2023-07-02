import React, { useState } from 'react';
import './createQuery.css';

const CreateQuery = () => {

  const [isChecked,setIsChecked] = useState(true)

  return (
    <div className="for-container">
        <h2>Create a new query</h2>

        <h3>Query subject</h3>
        <input type="text" className="query-sub-input" placeholder="Subject of query"/>
        <h3>Keep it private?</h3>
        <label>
            <input type="checkbox" class="sub-scribe" value={isChecked} onChange={() => setIsChecked(prev => !prev)}/>
            {isChecked? "Private" : "Public"}
        </label>
        <h3>Query description</h3>
        <textarea placeholder="More details about query...."></textarea>
    </div>
  )
}

export default CreateQuery