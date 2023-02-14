import React, {useState} from 'react'
import { Link } from "react-router-dom";
import './navbar.css';
import {toast} from 'react-toastify'
import userLogo from '../../assets/user.png';
import useAuth from '../../utils/hooks/useAuth';
import Cookies from 'universal-cookie';



const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <i class="fa-solid fa-house"></i>,
    cName: "nav-text",
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <i class="fa-solid fa-pen-to-square"></i>,
    cName: "nav-text",
  },
  {
    title: "Silicon Connect",
    path: "/social",
    icon: <i class="fa-sharp fa-solid fa-circle-nodes"></i>,
    cName: "nav-text",
  },
  {
    title: "Notes",
    path: "/notes",
    icon: <i class="fa-solid fa-book"></i>,
    cName: "nav-text",
  },
  {
    title: "Queries",
    path: "/queries",
    icon: <i class="fa-solid fa-clipboard-question"></i>,
    cName: "nav-text",
  },

];

const NavBar = () => {
  
  const { auth } = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home")

  const showSidebar = () => setSidebar(!sidebar);
  const cookies = new Cookies();
  
  const logoutHandler = () => {
    cookies.remove('user');
    toast.info("User logger out successfully");
  }

  return (
    <div>
        <div className="navbar">
          <Link to="#" className="menu-bars">
          <i class="fa-solid fa-bars-staggered" onClick={showSidebar}></i>
          </Link>
          <div className="nav-title">{currentPage}</div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <i class="fa-solid fa-xmark"></i>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="profile-box" onClick={() => setCurrentPage("Profile")}>
                <div className="profile-icon">
                  <img src={userLogo} alt="Profile"/>
                </div>
                <span className="profile-name">{auth.name}</span>
              </Link>
            </li>
            <hr/>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} onClick={() => setCurrentPage(item.title)}>
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