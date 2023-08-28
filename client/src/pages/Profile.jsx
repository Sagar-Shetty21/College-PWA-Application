import React, {useState} from 'react';
import './profile.css';
import useAuth from '../utils/hooks/useAuth';
import {useSharedState} from '../context/sharedStateContext';

const Profile = () => {

  const { auth } = useAuth();
  const {userProfileImg} = useSharedState();

  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(userProfileImg);
  const [name, setName] = useState(auth.name);
  const [id, setId] = useState(auth.student_id);
  const [email, setEmail] = useState(auth.email);
  const [number, setNumber] = useState(auth.phone);
  const [section, setSection] = useState(auth.section);
  const [semister, setSemister] = useState("");
  const [gender, setGender] = useState(auth.gender);
  const [active, setActive] = useState("profile");

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


  const handleSubmit = (e) => {
    e.preventDefault();



    let activeP = active === "edit" ? "profile" : "edit";
    setActive(activeP)
  };

  
  return (
    <div className="profile-page-container">
        {active === "edit" ? (
          <div className="profile-card">
          <form onSubmit={handleSubmit}>
            <label htmlFor="photo-upload" className="custom-file-upload fas">
              <div className="img-wrap img-upload">
                <img for="photo-upload" src={imagePreviewUrl} alt="profile-img"/>
              </div>
              <input id="photo-upload" type="file" onChange={photoUpload} />
            </label>
            <div className="field">
              <label htmlFor="name">name</label>
              <input id="name" type="text" onChange={(e) => setName(e.target.value)} maxlength="25" value={name} placeholder="Alexa" disabled />
            </div>
            <div className="field">
              <label htmlFor="id">ID</label>
              <input id="id" type="text" onChange={(e) => setId(e.target.value)} maxlength="25" value={id} placeholder="R12345678" disabled />
            </div>
            <div className="field">
              <label htmlFor="section">Section</label>
              <input id="section" type="text" onChange={(e) => setSection(e.target.value)} maxlength="8" value={section} placeholder="B.COM" disabled />
            </div>
            <div className="field">
              <label htmlFor="semister">Semister</label>
              <select id="semister" onChange={(e) => setSemister(e.target.value)} value={semister} required>
                <option value="">Choose Your Semister</option>
                <option value="1">I Sem</option>
                <option value="2">II Sem</option>
                <option value="3">III Sem</option>
                <option value="4">IV Sem</option>
                <option value="5">V Sem</option>
                <option value="6">VI Sem</option>
                <option value="7">VII Sem</option>
                <option value="8">VIII Sem</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="email">email</label>
              <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} maxlength="35" value={email} placeholder="examaple@email.com" required />
            </div>
            <div className="field">
              <label htmlFor="number">contact number</label>
              <input id="number" type="number" onChange={(e) => setNumber(e.target.value)} value={number} placeholder="9876543210" required />
            </div>
            <button type="submit" className="save">Save{" "}</button>
          </form>
        </div>
        ) : (
          <div className="profile-card">
            <form onSubmit={handleSubmit}>
              <label className="custom-file-upload fas">
                <div className="img-wrap">
                  <img for="photo-upload" src={userProfileImg} alt="profile-img"/>
                </div>
              </label>
              <div className="profile-name">{name}</div>
              <div className="profile-status">{id}</div>
              <div className="profile-status">{email}</div>
              <div className="profile-status">{number}</div>
              <div className="profile-status">{section}</div>
              <div className="profile-status">{semister}</div>
              <div className="profile-status">{gender}</div>
              <button type="submit" className="edit">
                Edit Profile{" "}
              </button>
            </form>
          </div>
        )}
    </div>
  )
}

export default Profile

