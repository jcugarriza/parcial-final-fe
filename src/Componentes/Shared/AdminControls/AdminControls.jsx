import React from "react";
import "./AdminControls.css";
import { useNavigate } from 'react-router-dom';

function AdminControls() {
  const navigateTo = useNavigate();

  const addArticle = (e) => {
    e.preventDefault()
    navigateTo('/createarticle')
  }

  const removeArticles = (e) => {
    e.preventDefault()
    navigateTo('/createarticle')
  }

  return (
    <div id="controls-container">
      <button type="button" id="add-article" className="admin-controls-button" onClick={addArticle}>Agregar artículo</button>
      <button type="button" id="remove-selected-articles" className="admin-controls-button" onClick={removeArticles}>Eliminar artículo</button>
    </div>
  );
};
  
export default AdminControls;
