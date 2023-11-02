import React, {useState} from 'react';
import './profile.css';
import useAuth from '../utils/hooks/useAuth';
import {useSharedState} from '../context/sharedStateContext';

const Profile = () => {

  const { auth } = useAuth();
  const {userProfileImg} = useSharedState();
  //console.log(userProfileImg)

  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(userProfileImg);
  const [name, setName] = useState(auth.name);
  const [id, setId] = useState(auth.student_id);
  const [email, setEmail] = useState(auth.email);
  const [number, setNumber] = useState(auth.phone);
  const [section, setSection] = useState(auth.section);
  const [semister, setSemister] = useState("");
  const [gender, setGender] = useState(auth.gender);

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    //setIsLoading(true);
    const base64Data = await ConvertBase64(file);
    const PayloadData = {regNo: auth.student_id, image: {base64Data}}

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/profile/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(PayloadData)
        })
        .then(response => response.json())
        .then(data => {
          //setIsLoading(false);
          if (data.error) {
            console.log(data.error)
          }else{
            console.log(response)
          }
        })
  };

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
    <div className="profile-page-container">
          <div className="profile-card">
            <form onSubmit={handleSubmit}>
              <label htmlFor="photo-upload" className="custom-file-upload fas">
                <div className="img-wrap img-upload">
                  <img for="photo-upload" src={imagePreviewUrl} alt="profile-img"/>
                </div>
                <input id="photo-upload" type="file" onChange={photoUpload} />
              </label>
              <div className="profile-name">{name}</div>
              <div className="profile-status">{id}</div>
              <div className="profile-status">{email}</div>
              <div className="profile-status">{number}</div>
              <div className="profile-status">{section}</div>
              <div className="profile-status">{semister}</div>
              <div className="profile-status">{gender}</div>
              {file !== "" && <button type="submit" className="save">Save{" "}</button>}
            </form>
          </div>
    </div>
  )
}

export default Profile

