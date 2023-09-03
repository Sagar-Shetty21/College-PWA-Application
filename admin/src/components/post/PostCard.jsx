import React, {useState, useEffect} from 'react'
import './styles.css'

const PostCard = ({images, data}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        }, 4500);
    
          return () => clearInterval(interval);
    }, [currentImageIndex, images])

  return (
    <div className="post-card">
        <div className="left">
            <div className="text-content">{data.textData}</div>  
            <div className="time-content">{data.createdAt}</div>
        </div>
        <div className="right">
            <div className="images-area">
            {images.map( img => {
                return(
                <div 
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
            </div>
            <div class="buttons-area">
            <div class="previous-btn" onClick={handlePreviousClick}>
                <i class="fa-solid fa-chevron-left"></i>
            </div>
            <div class="next-btn" onClick={handleNextClick}>
                <i class="fa-solid fa-chevron-right"></i>
            </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard