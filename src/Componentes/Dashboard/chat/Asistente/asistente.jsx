import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../nav/nav";
import ChatBody from "../chatBody/chatBody";

const Recomendaciones = () => {
  return (
    <div id="c_body">
      <div className="__main">
        <Nav />
        <div className="content">
          <ChatBody />
        </div>
      </div>
    </div>
  );
};

export default Recomendaciones;
