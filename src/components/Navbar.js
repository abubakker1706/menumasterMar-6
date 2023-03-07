import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import"./Navbar.css"
import {

  
  signOut,
 
} from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "@mui/material";
function Navbar() {
  const user = localStorage.getItem('userID');
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userID');
      navigate('/signin');
      alert("Successfully logged out");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(handleLogout)
  console.log(user);
  console.log(user?.photoURL);

  return (
    <div className="Navbar">
    <div   style={{
          
         display: "flex",
          marginLeft: "auto",
          alignItems:"center",
          justifyContent:"center",
         
        }}>
      <img
        src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          marginLeft: 10,
          marginRight: 10,
        }}
      />
      <h3>{user?.displayName}</h3>
      <div >
        {/* {user?.email ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <Link to="/signin">SignIn</Link>
        )} */}
        <Button  onClick={handleLogout}  variant="contained">logout</Button>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
