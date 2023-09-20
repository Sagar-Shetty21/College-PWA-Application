import React, { useEffect, useState } from 'react'


const QueryCard = ({data, type, updateData}) => {
  const [resolveSecActive,setResolveSecActive] = useState(false)
  const [resolveInfoText, setResolveInfoText] = useState("")

  const timestamp = data.created_at;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();
  
  const resolvedTimestamp = data?.resolvedAt;
  const resolvedDate = new Date(resolvedTimestamp);
  const resolvedFormattedDate = resolvedDate.toLocaleString();


  useEffect(() => {
    if(type === "resolved"){
      setResolveInfoText(data.resolved_info)
    }
  },[])

  const handleSubmit = () => {
    const trimmedText = resolveInfoText.trim();
    if(trimmedText === ""){
      alert("Please add some info to resolve the query!")
    }else{
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/queries/resolve_query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: data.id, resolvedInfo: resolveInfoText})
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log(data.error.code)
          alert("Server Error!")
        }else{
          alert("Query Resolved Successfully!")
          updateData();
        }
      })
    }
  }
  
  return (
    <div className="query-card">
      <div className='left-section'>
        <div className="query-top-info">
          <div className="query-subject">{data.subject}</div>
          <div className="query-student-info">
            <div className="query-student-name">{data.student_name}</div>
            <div className="query-student-id">{data.student_id}</div>
          </div>
        </div>
        <div className="query-description">{data.description}</div>
        <div className="query-date">Query created on: {formattedDate}</div>
      </div>
      {type === "active" ? 
        <div className="right-section">
          {
            resolveSecActive ? 
            <div className="response-input">
              <textarea type="text" placeholder="Type your response here..." value={resolveInfoText} onChange={(e) => setResolveInfoText(e.target.value)} />
              <div className="buttons-section">
                <div className="submit-btn" onClick={handleSubmit}>Submit</div>
                <div className="cancel-btn" onClick={() => setResolveSecActive(false)}>Cancel</div>
              </div>
            </div>
            :
            <div className="response-btn" onClick={() => setResolveSecActive(true)}>
              Resolve
            </div>
          }
        </div>
      : 
      <div className="right-section">
        {
          <div className="response-input">
            <textarea type="text" placeholder="Type your response here..." value={resolveInfoText} onChange={(e) => setResolveInfoText(e.target.value)} readOnly/>
            <div className="buttons-section">
              <div className="resolved-date-btn">Query resolved on: {resolvedFormattedDate}</div>
            </div>
          </div>
        }
      </div>
      }
    </div>
  )
}

export default QueryCard