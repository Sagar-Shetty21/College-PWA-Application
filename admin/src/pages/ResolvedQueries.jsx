import React, {useState, useEffect} from 'react'

const ResolvedQueries = () => {
  const [resolvedQueries,setResolvedQueries] = useState([])

  useEffect(() => {
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
    fetchData();
  },[])
  
  return (
    <div>ResolvedQueries</div>
  )
}

export default ResolvedQueries