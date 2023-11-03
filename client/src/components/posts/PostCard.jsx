import React, {useState, useEffect} from 'react'

const PostCard = ({ images, data }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

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


  return (
    <div className="post-card">
        {images.length > 0 && 
            <div className="top">
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
        }

        <div className="bottom">
            <div className="text-content"><div dangerouslySetInnerHTML={createMarkup()} /></div>
            <div className="lower-left">
                <div className="time-content">Posted On: {formattedDate}</div>
            </div>  
        </div>
    </div>
  )
}

export default PostCard