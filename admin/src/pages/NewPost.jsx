import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import './posts.css'

const NewPost = () => {

  const [textData, setTextData] = useState("");
  const [imageData, setImageData] = useState([]);

  const AddImage = (e) => {
    const newFile = e.target.files[0];
    const fileSize = newFile.size;
    if (fileSize <= 1048576) {
      setImageData(prev => [...prev, newFile]);
    }else{
      alert("Please upload Images of size below 1MB!")
    }
  }

  const removeImage = (indexToRemove) => {
    setImageData(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const LoadImgPreview = () => (
    <div className="selected-img-preview">
      {imageData.map((file, index) => (
        <div key={index} className="preview-item">
          <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
          <button onClick={() => removeImage(index)}>Remove</button>
        </div>
      ))}
    </div>
  )

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const base64DataArray = await Promise.all(
      imageData.map(async (file) => {
        const base64Data = await ConvertBase64(file);
        return base64Data;
      })
    );

    const PayloadData = {text: textData, images: {base64DataArray}}

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/posts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(PayloadData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.log(data.error.code)
        alert("Server Error!")
      }else{
        alert("submitted successfully")
      }
    })
  }

  const ConvertBase64 = (ImgArray) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(ImgArray);

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = () => {
        reject(fileReader.error)
      }
    })
  }

  return (
    <div className="new-post-page">
      <div className="new-post-container">
        <form onSubmit={handleSubmit}>
        <div className="page-title">Create a New Post</div>
        <div className="new-post-content">  
          <ReactQuill theme="snow" value={textData} onChange={setTextData} className="text-editor"/>
          <LoadImgPreview />
        </div>
        <div className="new-post-btns">
          <div className="img-upload-btn-wrapper">
            <input type="file" onChange={AddImage} />
            <button>Upload an Image</button>
          </div>
        </div>
        <button type="submit" className="submit-post-btn">Publish</button>
        </form>
      </div>
    </div>
  )
}

export default NewPost