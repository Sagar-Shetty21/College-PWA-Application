import React, {useEffect, useState} from 'react'
import './posts.css';
import PostCard from '../components/post/PostCard';


const AllPosts = () => {
  const [postsData, setPostsData] = useState([])

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
        await setPostsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);



  return (
    <div className="posts-container">
      {postsData.map( (post) => {
        const imagesString = post.images;
        const imagesStringSplit = imagesString.split(',')
        const imagesArray = imagesStringSplit.map((item, index) => {
          if (index % 2 === 0) {
            // For even indices, combine with the next element
            return item + (imagesStringSplit[index + 1] ? "," + imagesStringSplit[index + 1] : "");
          } else {
            // For odd indices, return undefined or an empty string
            return undefined;
          }
        }).filter(Boolean);
        
        return (
          <PostCard images={imagesArray} data={post} key={post.id} setData={setPostsData}/>
        )
      })}
    </div>
  )
}

export default AllPosts











