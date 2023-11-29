import React from "react";
import "./CreateArticleTopBanner.css";
import { useNavigate } from 'react-router-dom';
import bannerBg from "../../../assets/TopBanner/bq.jpeg";

function CreateArticleTopBanner(props) {
  const navigateTo = useNavigate();

  const logoutUser = (e) => {
    e.preventDefault()
    navigateTo('/login')
  }

  const takeUserBackToAdminBody = (e) => {
    e.preventDefault()
    navigateTo('/admin')
  }

  return (
    <div id="create-article-topbanner">
      <img className="create-article-topbanner-bg" src={bannerBg} alt="bannerBg"/>
      <div id="create-article-topbanner-content-div">
        <h1 id="create-article-topbanner-title">Agregar nuevo artículo</h1>
        <div id="create-article-topbanner-buttons">
          <button type="button" className="create-article-topbanner-button" id="create-article-topbanner-back-button" onClick={takeUserBackToAdminBody}>
            Volver a vista de Admin
          </button>
          <button type="button" className="create-article-topbanner-button" id="create-article-topbanner-logout-button" onClick={logoutUser}>
            Volver a Login
          </button>
        </div>
      </div>
    </div>
  );
};
  
export default CreateArticleTopBanner;
