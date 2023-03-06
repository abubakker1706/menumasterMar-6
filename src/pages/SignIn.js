// import React, { useContext, useEffect } from "react";
// import GoogleButton from "react-google-button";
// import { ContextInfo } from "../context/Context";
// import { useNavigate } from "react-router-dom";
// import "./SignIn.css"

// import axios from "axios";

// function SignIn() {
  
//   const { googleSignIn ,user} = ContextInfo();
    

//   const navigate = useNavigate();
  


//   // const handlegoogleSignIn = async () => {
//   //   await googleSignIn();
//   //   try {
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   const handlegoogleSignIn = async () => {
//     try {
      
//       const userCredential = await googleSignIn();
//       const { user } = userCredential;
   

//       const [postDataResponse] = await Promise.all([
//         axios.post(`https://plankton-app-ovujs.ondigitalocean.app/routes/users`, {
//           action: "createRead",
//           email: user.email,
//         }),
//         // any other async requests that you want to make
//       ]);
     
  
//       // handle postDataResponse and any other responses here
  
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (user?.email !==null) {

//       console.log("user is", user?.email);
   
//     }
// console.log(user,'userrrrrrrrrrrrr')
//     // if (user.email !== null && user.phoneNumber !== null) {
//     //   console.log("user is", user.phoneNumber);
//     //   console.log("user is", user.email);
//     //   navigate("/account");
//     // }
//   }, []);
//   navigate("/brand");

//   return (
//     <div className="center" >
//       <h1>Sign-in</h1>
//       <div  className="googlebtn">
//         <GoogleButton onClick={handlegoogleSignIn} className="googlebtn"/>
//       </div>
//     </div>
//   );
// }

// export default SignIn;
import React, { useContext, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import ContextProvider, { Exportvalues } from '../context/Context';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignIn = () => {
  const {userID, setUserID} = useContext(Exportvalues);
  const {Email, setEmail} = useContext(Exportvalues);

  const {Name, setName} = useContext(Exportvalues);
const navigate = useNavigate();
  const {PhotoUrl, setPhotoUrl} = useContext(Exportvalues);
  console.log(userID,"iddddddddddddd")
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth,provider)
      .then(
        onAuthStateChanged(user => {
          if (user) {
            let email = user.email;
            axios.post('https://plankton-app-ovujs.ondigitalocean.app/routes/users', {
              action: 'createRead',
              email: email,
            }).then(Response => {
              console.log(
                'Login Data@@@@@@@@@@@@@@@@@@@@@@@@@@',
                Response.data[0].userid,
              );

              setUserID(Response.data[0].userid);
           alert('Login Successfull')
              
            });
          }
        })


      );
      // Handle successful authentication
 
    } catch (error) {
      // Handle authentication errors
      console.log(error);
    }
  };
  navigate('/brand');
 
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth,user => {
    
        onAuthStateChanged(auth,user => {
          if (user) {
            let email = user.email;
            axios.post('https://plankton-app-ovujs.ondigitalocean.app/routes/users', {
              action: 'createRead',
              email: email,
            }).then(Response => {
              console.log(Response?.data[0].userid)
              setUserID(Response?.data[0].userid);
              localStorage.setItem("userID", Response.data[0].userid);
              setEmail(user?.email);
              setName(user?.displayName);
              setPhotoUrl(user?.photoURL);
          

           
              console.log(Email,Name,PhotoUrl,"emailllllllll",user?.email,user?.displayName,user?.photoURL)

             alert("Login Successful");
             navigate('/brand');

            
            });
          }
        });
      
    });
    const storedUserID = localStorage.getItem("userID");
    console.log("storedUserID:", storedUserID);
    if (userID ===storedUserID) {
      setUserID(storedUserID);
    }
    return subscribe;
  }, [userID,Email,Name,PhotoUrl]);

  console.log(userID,"userIddd")
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;


