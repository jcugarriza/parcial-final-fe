import React, { useState, useEffect } from "react";
import "./Login.css";
import video from "../../assets/LoginAssets/loginVideo.mp4";
import logo from "../../assets/LoginAssets/Logo.png";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
  const navigateTo = useNavigate();

  // Se almacenan los inputss
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Mensaje de estado del log in
  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");

  const loginUser = (e) => {
    e.preventDefault()

    if (userName.length == 0 || password.length == 0) {
      setLoginStatus('Usuario o contraseña vacíos')
    }
    else {
      navigateTo('/client')

      /*Axios.post('api url', {
        user_name: userName,
        user_password: password
      }).then((response) => {
        if (response.status == '200') {
          if (true) {
            navigateTo('/admin')
          } else {
            navigateTo('/client')
          }
        }
        else {
          console.log(response);
        }
      }).catch((error) => {
        if (error.response.status != '401') {
          console.log(error);
          setLoginStatus('Server error')
        }
        else {
          setLoginStatus('Credenciales inválidas')
        }
      })*/
    }
  }

  // Limpiamos el formulario luego de submit
  const onSubmit = () => {
    setUserName('')
    setPassword('')
  }

  useEffect(() => {
    if (loginStatus !== '') {
      setStatusHolder('showMessage')
      setTimeout(() => {
        setStatusHolder('message')
      }, 4000);
    }
  }, [loginStatus])

  return (
    <div className="loginpage flex">
      <div className="container flex">
        <div className="videodiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textdiv">
            <h2 className="title">¡Bienvenido al Marketplace de ReactJS!</h2>
            <p>
              Parcial final para la materia de Desarrollo Web Frontend del semestre 2023-30 por parte del estudiante Juan Ugarriza. Basado en la página realizada para Proyecto Final de Ingeniería de Sistemas del mismo estudiante.
            </p>
          </div>
        </div>

        <div className="formdiv flex">
          <div className="headerdiv">
            <img src={logo} alt="logo image" />
            <h4>Inicia sesión según tu usuario
              <br/>cliente o admin</h4>
          </div>

          <form action="" className="form grid" onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>
            <div className="inputdiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Ingresa tu usuario"
                  onChange={(event) => {
                    setUserName(event.target.value)
                  }}
                />
              </div>
            </div>

            <div className="inputdiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Iniciar sesión</span>
              <AiOutlineSwapRight className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;