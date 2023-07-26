import React, { useState, useEffect} from 'react'
import './queries.css'
import { Link } from 'react-router-dom'
import QueryCard from '../components/queries/QueryCard'

const Queries = () => {

  const [publicQueries, setPublicQueries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/queries/get_all_public_queries', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setPublicQueries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      {publicQueries.map(query => (
        <QueryCard key={`${query.subject}-${query.description}`} data={query}/>
      ))}
      <Link to="/create_query"><div className="create-btn">Create Query</div></Link>
    </div>
  )
}

export default Queries