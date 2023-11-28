import React from "react";
import "./ClientBody.css";
import TopBanner from "./../Shared/TopBanner/TopBanner";
import Section from "./../Shared/Section/Section";

function ClientBody() {
  return (
    <div id="client-body">
      <TopBanner
        bannerText="¡Bienvenido al Marketplace de ReactJS, Cliente!"
        userType="client"
      />
      <div id="client-dashboard">
      <Section
          userType='client'
        />
      </div>
    </div>
  );
};

export default ClientBody;
