// import React, { useState } from "react";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { ContextInfo } from "../context/Context";
// import TextField from '@mui/material/TextField';
// import { useNavigate } from "react-router-dom";
// import Button from '@mui/material/Button';
// import "./otp.css"

// function Otp() {
//   const [phone, setPhone] = useState();
//   const [codeOTP, setCodeOTP] = useState();
//   const auth = getAuth();
//   const navigate = useNavigate();
//   const { user, Mobile, setMobile } = ContextInfo();

//   const configureCaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       "sign-in-button",
//       {
//         size: "invisible",
//         callback: (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//           onSignInSubmit();
//           console.log("recaptcha verified");
//         },
//         "expired-callback": () => {},
//       },
//       auth
//     );
//   };

//   const onSignInSubmit = (e) => {
//     e.preventDefault();
//     configureCaptcha();

//     const phoneNumber = `+91${phone}`;
//     console.log("phonenumber is", phoneNumber);
//     const appVerifier = window.recaptchaVerifier;
//     console.log("appVerifier is", appVerifier);
//     console.log("auth is", auth);

//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         console.log("OTP has been sent");
//       })
//       .catch((error) => {
//         // console.log(phoneNumber);
//         console.log("SMS not sent", error);
//       });
//   };

//   const onSubmitOTP = (e) => {
//     e.preventDefault();
//     const code = codeOTP;
//     console.log(code);
//     window.confirmationResult
//       .confirm(code)
//       .then((result) => {
//         // User signed in successfully.
//         const user = result.user;
//         // console.log(JSON.stringify(user));
//         console.log(user?.phoneNumber);
//         setMobile(user?.phoneNumber);
//         // navigate("/account");
//         alert("User is verified");

//         // ...
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div  className="formdiv" >
//       <form onSubmit={onSignInSubmit}>
     
//         <TextField
//           type="number"
//           name="mobile"
//           variant="outlined" 
//           label="Mobile number"
//           required
//           onChange={(event) => {
//             setPhone(event.target.value);
//           }}
//         />
//         <Button type="submit" variant="contained">Submit</Button>
//       </form>

     
//       <form onSubmit={onSubmitOTP}>
//         <TextField
//           type="number"
//           variant="outlined" 
//           name="otp"
//           label="OTP Number"
//           required
//           onChange={(event) => {
//             setCodeOTP(event.target.value);
//           }}
//         />
//         <Button type="submit"  variant="contained">Submit</Button>
//       </form>
//     </div>
//   );
// }

// export default Otp;
