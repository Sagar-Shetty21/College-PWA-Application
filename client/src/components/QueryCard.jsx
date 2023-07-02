import React from 'react'
import './queryCard.css'

const QueryCard = (data) => {

    const expandCard = () => {
        
    }

  return (
    <div className="card-wrapper" onClick={expandCard}>
        <div className="card">
            <div className="subject">{data.data.subject}</div>
            <div className="description">{data.data.description}</div>
            <div className="student-name">raised by - {data.data.student_name}</div>
        </div>
    </div>
  )
}

export default QueryCard