import React, {useState, useEffect} from 'react'
import PopupModal from '../../modals/popupModal';

const PostCard = ({images, data, setData}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [active, setActive] = useState(false);
  

    const timestamp = data.createdAt;
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString(); 

    const handleNextClick = () => {
        if (currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePreviousClick = () => {
        if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImageIndex !== images.length - 1) {
              setCurrentImageIndex(currentImageIndex + 1);
            } else {
              setCurrentImageIndex(0);
            }
        }, 3500);
    
          return () => clearInterval(interval);
    }, [currentImageIndex, images])

    const createMarkup = () => {
        return { __html: data.textData };
    };

    const handleDelete = async () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/posts/delete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: data.id})
          })
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              console.log(data.error.code)
              alert("Server Error!")
            }else{
              alert("Post deleted successfully")
            }
          })

        setActive(false)
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/posts/all_posts`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const data = await response.json();
            await setData(data);
          } catch (error) {
            console.error(error);
          }
    }

  return (
    <div className="post-card">
        <div className="left">
            <div className="text-content"><hr/><div dangerouslySetInnerHTML={createMarkup()} /><hr/></div>
            <div className="lower-left">
                <div className="time-content">Posted On: {formattedDate}</div>
                <div className="post-delete-btn" onClick={() => setActive(true)}>Delete Post</div>
            </div>  
        </div>
        <div className="right">
            <div className="images-area">
                {images.map( img => {
                    return(
                    <div
                        key={img}
                        className="image-container"
                        style={{
                        width: `${images.length * 100}%`,
                        transform: `translateX(-${currentImageIndex * (100)}%)`,
                        }}
                    >
                        <img src={img} alt="post-images" />
                    </div>
                    )
                })}
                {images.length === 0 && <div className="no-img-alert">No images to preview!</div>}
            </div>
            <div className="buttons-area">
                <div className="previous-btn" onClick={handlePreviousClick}>
                    <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div className="next-btn" onClick={handleNextClick}>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
            </div>
            <div className="pagination-area">
                {images.map((image, index) => (
                    <span key={index} className={index === currentImageIndex ? 'active' : ''}></span>
                ))}
            </div>
        </div>
        {active ? <PopupModal active bg="orange" toggleActive={() => setActive(!active)}>
            <h1>Are you sure you want to delete this post?</h1>
            <br/><br/>
            <button 
            onClick={handleDelete}
            style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                margin: '8px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
            >
            Confirm
            </button>
        </PopupModal>:null}
    </div>
  )
}

export default PostCard