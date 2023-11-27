import React, { Component } from "react";
import "./userProfile.css";
import Michelle from "../../../../assets/ChatAssets/estudiante.jpg";

export default class UserProfile extends Component {
  toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };
  render() {
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src={Michelle} />
          </div>
          <h4>Cliente</h4>
          <p>Cliente en la página</p>
        </div>
        <div className="profile__card">
          <div className="card__header" onClick={this.toggleInfo}>
            <h4>Información</h4>
            <i className="fa fa-angle-down"></i>
          </div>
          <div className="card__content">
            Décimo semestre del programa de Ingeniería de Sistemas de la
            Universidad del Norte.
          </div>
        </div>
      </div>
    );
  }
}
