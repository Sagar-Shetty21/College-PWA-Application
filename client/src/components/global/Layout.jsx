import React from 'react';
import NavBar from './NavBar';

const Layout = ({children}) => {
  return (
    <>
      <NavBar/>
      <div className="main-body-container">
        {children}
      </div>
    </>
  )
}

export default Layout