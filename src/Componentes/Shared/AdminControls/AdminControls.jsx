import React from "react";
import "./AdminControls.css";
import { useNavigate } from 'react-router-dom';

function AdminControls(props) {
  const navigateTo = useNavigate();

  const addArticle = (e) => {
    navigateTo('/createarticle')
  }

  return (
    <div id="controls-container">
      <button type="button" id="add-article" className="admin-controls-button" onClick={addArticle}>Agregar artículo</button>
      <button type="button" id="remove-selected-articles" className="admin-controls-button" onClick={props.onClickRemoveArticles}>Eliminar artículos</button>
    </div>
  );
};
  
export default AdminControls;
