import React from "react";
import "./Login.css";
import video from "../../assets/LoginAssets/loginVideo.mp4";
import logo from "../../assets/LoginAssets/Logo.png";
import { useNavigate } from 'react-router-dom';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
  const navigateTo = useNavigate();

  const loginClientUser = (e) => {
    e.preventDefault()
    navigateTo('/client')
  }

  const loginAdminUser = (e) => {
    e.preventDefault()
    navigateTo('/admin')
  }

  return (
    <div className="loginpage flex">
      <div className="container flex">
        <div className="videodiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textdiv">
            <h2 className="title">¡Bienvenido al Marketplace de ReactJS!</h2>
            <p>
              Parcial final para la materia de Desarrollo Web Frontend del semestre 2023-30 por parte del estudiante Juan Ugarriza
            </p>
          </div>
        </div>

        <div className="formdiv flex">
          <div className="headerdiv">
            <img src={logo} alt="logo image" />
            <h4>Inicia sesión según tu usuario
              <br/>cliente o admin</h4>
          </div>

          <form action="" className="form grid">
            <button type="submit" className="btn flex" onClick={loginAdminUser}>
              <span>Como admin</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            <button type="submit" className="btn flex" onClick={loginClientUser}>
              <span>Como cliente</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;