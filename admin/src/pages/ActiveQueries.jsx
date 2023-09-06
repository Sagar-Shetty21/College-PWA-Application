import React, { useEffect, useState } from 'react'
import './queries.css'
import QueryCard from '../components/queries/QueryCard'

const ActiveQueries = () => {
  const [activeQueries,setActiveQueries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/queries/get_all_active_queries`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        await setActiveQueries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  },[])
  
  return (
    <div className="query-container">
      <div className="query-page-title">Active Queries</div>
      {
        activeQueries.map(query => {
          return <QueryCard key={query.id} data={query} />
        })
      }
    </div>
  )
}

export default ActiveQueries