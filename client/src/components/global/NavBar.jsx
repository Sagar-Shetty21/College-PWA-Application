import React, {useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom";
import './navbar.css';
import {toast} from 'react-toastify'
import userLogo from '../../assets/user.png';
import useAuth from '../../utils/hooks/useAuth';
import Cookies from 'universal-cookie';
import SharedStateContext from '../../context/sharedStateContext';



const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <i class="fa-solid fa-house"></i>,
    cName: "nav-text",
  },
  {
    title: "Campus News",
    path: "/campus_news",
    icon: <i class="fa-solid fa-graduation-cap"></i>,
    cName: "nav-text",
  },
  {
    title: "StudyChat",
    path: "/chat",
    icon: <i class="fa-solid fa-comments"></i>,
    cName: "nav-text",
  },
  {
    title: "Notes",
    path: "/notes",
    icon: <i class="fa-solid fa-book"></i>,
    cName: "nav-text",
  },
  {
    title: "Forms and Surveys",
    path: "/forms",
    icon: <i class="fa-brands fa-wpforms"></i>,
    cName: "nav-text",
  },
  {
    title: "Queries",
    path: "/queries",
    icon: <i class="fa-solid fa-clipboard-question"></i>,
    cName: "nav-text",
  },

];

// Backdrop component
const Backdrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

const NavBar = () => {
  
  const { auth } = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const { currentPageName, setCurrentPageName } = useContext(SharedStateContext);

  useEffect(() => {
    // Retrieve the active navigation item from browser storage
    var storedActiveNavItem = sessionStorage.getItem('activeNavItem');

    !storedActiveNavItem && (storedActiveNavItem = "Home");

    if (storedActiveNavItem) {
      setCurrentPageName(storedActiveNavItem);
    }
  }, [setCurrentPageName]);

  const showSidebar = () => setSidebar(!sidebar);
  const cookies = new Cookies();
  
  const logoutHandler = () => {
    cookies.remove('user');
    sessionStorage.clear();
    toast.info("User logger out successfully");
  }

  const handleNavItemClick = (item) => {
    setCurrentPageName(item);
    // Store the active navigation item in browser storage
    sessionStorage.setItem('activeNavItem', item);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <div>
        <div className="navbar">
          <Link to="#" className="menu-bars">
          <i class="fa-solid fa-bars-staggered" onClick={showSidebar}></i>
          </Link>
          <div className="nav-title">{currentPageName}</div>
        </div>
        {sidebar && <Backdrop onClick={closeSidebar} />} {/* Render the backdrop only when needed */}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <i class="fa-solid fa-xmark"></i>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="profile-box" onClick={() => {setCurrentPageName("Profile"); handleNavItemClick("Profile");}}>
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
                  <Link to={item.path} onClick={() => {setCurrentPageName(item.title); handleNavItemClick(item.title);}}>
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