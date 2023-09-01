import React, {useEffect, useState} from 'react'
import './styles.css';

const AllPosts = () => {

  const [postsData, setPostsData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/posts/all_posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setPostsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="posts-container">
      <div className="post-card">
        hey
      </div>
    </div>
  )
}

export default AllPosts