import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();


  // useEffect(() => {
  //   if (user.email !== null) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  // useEffect(() => {
 
  //   // console.log("user_mail is", user.email);
  //   navigate("/otp");
  // }, []);

  return <div>Home Page</div>;
}

export default Home;
