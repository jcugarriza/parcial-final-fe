import React from "react";
import "./AdminBody.css";
import TopBanner from "./../Shared/TopBanner/TopBanner";
import Section from "./../Shared/Section/Section";
import AdminControls from "../AdminControls/AdminControls";

const AdminBody = () => {
  return (
    <div id="admin-body">
      <TopBanner
        bannerText="¡Bienvenido al Marketplace de ReactJS, Admin!"
        userType="admin"
      />
      <div id='admin-controls'>
        <AdminControls/>
      </div>
      <div id="admin-dashboard">
        <Section
          userType='admin'
        />
      </div>
    </div>
  );
};

export default AdminBody;
