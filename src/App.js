import React from "react";
import { Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Otp from "./pages/Otp";
import Roles from "./pages/Roles";
import Menu from "./pages/Menu";
import Brand from "./pages/Brand";
import Restaurant from "./pages/Restaurant";
import MenuType from "./pages/MenuType";
import QR from "./pages/QR";
import ContextProvider  from "./context/Context";
function App() {
  return (
    <div>
      
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
       
          <Route path="/roles" element={<Roles />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menutype" element={<MenuType />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/rest" element={<Restaurant />} />
          <Route path="/qr" element={<QR />} />
        </Routes>
     
    </div>
  );
}

export default App;
