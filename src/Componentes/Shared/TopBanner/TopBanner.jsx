import React from "react";
import "./TopBanner.css";
import { useNavigate } from 'react-router-dom';

function TopBanner({ bannerText, userType }) {
  const navigateTo = useNavigate();

  const logoutUser = (e) => {
    e.preventDefault()
    navigateTo('/login')
  }
  
  const buttonStyle = {
    backgroundColor: userType == 'admin' ? '#ff6655' : 'aquamarine',
    color: 'black',
    padding: '5px 10px',
    fontSize: '18px'
  }

  return (
    <div id="topbanner">
      <h1 id="topbanner-title">{bannerText}</h1>
      <button type="button" id="logout" onClick={logoutUser} style={buttonStyle}>Volver a Login</button>
    </div>
  );
};
  
export default TopBanner;
