import React, { createContext, useEffect, useState, useContext } from 'react';
import useAuth from '../utils/hooks/useAuth';

const SharedStateContext = createContext();

export const useSharedState = () => {
  return useContext(SharedStateContext)
}


export const SharedStateProvider = ({ children }) => {
  const [userProfileImg, setUserProfileImg] = useState("");
  const {auth} = useAuth();

  useEffect(() => {
    if (auth){
      const id = auth.student_id || auth.staff_id;
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/authentication/getprofileimg?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          /* 'authorization': `Bearer ${auth.accessToken}` */
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0 && data[0].profile_img.data) {
          const dataArray = data[0].profile_img.data;

          const buffer = new TextEncoder().encode(dataArray); // Replace 'Hello, World!' with your actual data

          const binary = String.fromCharCode.apply(null, buffer);
          const base64String = btoa(binary);

          console.log(base64String);

          setUserProfileImg(null);
        }else{
          setUserProfileImg("/assets/user-profile-default.jpg")
        }
      });
    }
  },[])



  return (
    <SharedStateContext.Provider value={{ userProfileImg, setUserProfileImg }}>
      {children}
    </SharedStateContext.Provider>
  );
};
