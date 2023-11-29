import React from "react";
import "./TopBanner.css";
import { useNavigate } from 'react-router-dom';

function TopBanner({ bannerText }) {
  const navigateTo = useNavigate();

  const logoutUser = (e) => {
    e.preventDefault()
    navigateTo('/login')
  }

  return (
    <div id="topbanner">
      <div id="topbanner-content-div">
        <h1 id="topbanner-title">{bannerText}</h1>
        <button type="button" id="logout-button" onClick={logoutUser}>Volver a Login</button>
      </div>
    </div>
  );
};
  
export default TopBanner;
