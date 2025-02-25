import { useContext } from 'react';
import UserContext from './UserContext';
import React,{useState} from 'react'

const UserState = (props) => {
  let userDetails=JSON.parse(localStorage.getItem('expense'));
  console.log(userDetails)
  const [userdata, setuserdata] = useState({
    user:userDetails?userDetails.user:null,
    login:userDetails?userDetails.login:false
  });
  return (
   <UserContext.Provider value={{userdata,setuserdata}}>
     {props.children}
   </UserContext.Provider>
  )
}

export default UserState
