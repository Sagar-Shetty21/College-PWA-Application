import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import './navbar.css';
import {toast} from 'react-toastify'
import useAuth from '../../utils/hooks/useAuth';
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router-dom';
import { useSharedState } from '../../context/sharedStateContext';


const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <i className="fa-solid fa-house"></i>,
    cName: "nav-text",
  },
  {
    title: "Campus News",
    path: "/campus_news",
    icon: <i className="fa-solid fa-graduation-cap"></i>,
    cName: "nav-text",
  },
  {
    title: "StudyChat",
    path: "/chat",
    icon: <i className="fa-solid fa-comments"></i>,
    cName: "nav-text",
  },
  {
    title: "Queries",
    path: "/queries",
    icon: <i className="fa-solid fa-clipboard-question"></i>,
    cName: "nav-text",
  },

];

// Backdrop component
const Backdrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

const NavBar = () => {
  
  const { auth, setAuth } = useAuth();
  const [ sidebar, setSidebar ] = useState(false);
  const [ currentPageName, setCurrentPageName ] = useState("Home");
  const {userProfileImg} = useSharedState();


  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if(path.startsWith('/','/home')){
      setCurrentPageName("Home");
    }
    if(path.startsWith('/chat')){
      setCurrentPageName("StudyChat");
    }else if(path.startsWith('/campus_news')){
      setCurrentPageName("Campus News");
    }else if(path.startsWith('/queries')){
      setCurrentPageName("Queries");
    }else if(path.startsWith('/profile')){
      setCurrentPageName("Profile");
    }
  },[path]);

  const showSidebar = () => setSidebar(!sidebar);
  const cookies = new Cookies();
  
  const logoutHandler = () => {
    cookies.remove('user');
    sessionStorage.clear();
    setAuth("");
    toast.info("User logger out successfully");
  }

  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <div>
        <div className="navbar">
          <Link to="#" className="menu-bars">
          <i className="fa-solid fa-bars-staggered" onClick={showSidebar}></i>
          </Link>
          <div className="nav-title">{currentPageName}</div>
        </div>
        {sidebar && <Backdrop onClick={closeSidebar} />} {/* Render the backdrop only when needed */}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <i className="fa-solid fa-xmark"></i>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="profile-box">
                <div className="profile-icon">
                  <img src={userProfileImg} alt="Profile"/>
                </div>
                <span className="profile-name">{auth.name}</span>
              </Link>
            </li>
            <hr/>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="nav-footer">
            <Link to="/login" onClick={logoutHandler}>
              <div className="logout-btn">
                <span className="btn-text">Log Out</span>
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>
            </Link>
          </div>
        </nav>
    </div>
  )
}

export default NavBar