import React from "react";
import {useNavigate } from "react-router-dom";
import "./C_Body.css";
import Nav from "./nav/nav";
import Dashboard from "./dashboard/dashboard";

const C_body = () => {

  return (
    <div id="c_body">
      <div className="__main">
      <Nav />
      <div className="content">
        <Dashboard />
      </div>
    </div>
    </div>
  );
};

export default C_body;
