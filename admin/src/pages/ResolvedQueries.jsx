import React, {useState, useEffect} from 'react'
import './queries.css'
import QueryCard from '../components/queries/QueryCard'


const ResolvedQueries = () => {
  const [resolvedQueries,setResolvedQueries] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/queries/get_all_resolved_queries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      await setResolvedQueries(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  },[])
  
  return (
    <div className="query-container">
      <div className="query-page-title">Resolved Queries</div>
      {
        resolvedQueries.map(query => {
          return <QueryCard key={query.id} data={query} type="resolved" updateData={fetchData} />
        })
      }
    </div>
  )
}

export default ResolvedQueries