import React, { useState, useEffect} from 'react'
import './queries.css'
import { Link } from 'react-router-dom'
import QueryCard from '../components/queries/QueryCard'
import useAuth from '../utils/hooks/useAuth'


const Queries = () => {

  const [userQueries, setUserQueries] = useState([]);
  const {auth} = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/queries/get_all_user_queries?student_id=${auth.student_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setUserQueries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
 

  return (
    <div>
      {userQueries.map(query => (
        <QueryCard key={query.id} data={query}/>
      ))}
      <Link to="/queries/create"><div className="create-btn">Create Query</div></Link>
    </div>
  )
}

export default Queries