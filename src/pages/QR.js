import React, { useEffect, useState } from "react";
import axios from "axios";

function QR() {
  useEffect(() => {
    const websiteURL = window.location.href;

    console.log(websiteURL);
  }, []);
  return (
    <div>
      <p>QR for Restaurent: </p>
      <p>QR for Table: </p>
      <img
        src={
          "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://quana-menumaster.netlify.app/?id=1"
        }
      ></img>
    </div>
  );
}

export default QR;
