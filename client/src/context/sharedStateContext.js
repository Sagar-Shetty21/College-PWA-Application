import React, { createContext, useState } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
  const [currentPageName, setCurrentPageName] = useState(sessionStorage.getItem('activeNavItem'));

  return (
    <SharedStateContext.Provider value={{ currentPageName, setCurrentPageName }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export default SharedStateContext;