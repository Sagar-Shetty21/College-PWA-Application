import React, {useState} from 'react';
import './profile.css';
import useAuth from '../utils/hooks/useAuth';

const Profile = () => {

  const { auth } = useAuth();

  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true");
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
      setFile({
        file: file,
        imagePreviewUrl: reader.result
      });
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
              <input id="semister" type="text" onChange={(e) => setSemister(e.target.value)} maxlength="8" value={section} placeholder="B.COM" disabled />
            </div>
            <div className="field">
              <label htmlFor="email">email</label>
              <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} maxlength="25" value={email} placeholder="examaple@email.com" required />
            </div>
            <div className="field">
              <label htmlFor="number">contact number</label>
              <input id="number" type="number" onChange={(e) => setNumber(e.target.value)} maxlength="25" value={number} placeholder="9876543210" required />
            </div>
            <button type="submit" className="save">Save{" "}</button>
          </form>
        </div>
        ) : (
          <div className="profile-card">
            <form onSubmit={handleSubmit}>
              <label className="custom-file-upload fas">
                <div className="img-wrap">
                  <img for="photo-upload" src={imagePreviewUrl} alt="profile-img"/>
                </div>
              </label>
              <div className="profile-name">{name}</div>
              <div className="profile-status">ID : {id}</div>
              <div className="profile-status">Email : {email}</div>
              <div className="profile-status">Contact Number : {number}</div>
              <div className="profile-status">Section : {section}</div>
              <div className="profile-status">Sem : {semister}</div>
              <div className="profile-status">Gender : {gender}</div>
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

