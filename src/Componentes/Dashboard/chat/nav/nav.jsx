import React, { Component } from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import Michelle from "../../../../assets/ChatAssets/estudiante.jpg";
import logout from "../../../../assets/ChatAssets/logout.svg";

const Nav = () => {
  const navigateTo = useNavigate();

  // Función para manejar la navegación
  const handleNavigation = (path) => {
    window.location.href = path; // Navegar a la URL correspondiente
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  const goToDashboard = () => {
    navigateTo("/dashboard");
  };

  const goToRecomendaciones = () => {
    navigateTo("/recomendaciones");
  };

  return (
    <div className="nav">
      <div className="nav__blocks">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src={Michelle} />
          </div>
          <h4>Michelle Gutiérrez</h4>
          <p>Estudiante del programa de Ingeniería de Sistemas</p>
        </div>
      </div>
      <div className="nav__blocks">
        <button onClick={() => handleNavigation('/home')}>Dashboard</button>
      </div>
      <div className="nav__blocks">
        <button onClick={() => handleNavigation('/asistente')}>Asistente Virtual</button>
      </div>
      <div className="nav__blocks">
        <button onClick={() => handleNavigation('/recomendaciones')}>Recomendaciones</button>
      </div>
      <div className="salir-parent" onClick={goToLogin}>
        <div className="salir">Salir</div>
        <img className="log-out-icon" alt="" src={logout} />
      </div>
    </div>
  );
};

export default Nav;
