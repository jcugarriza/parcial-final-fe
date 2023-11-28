import React from "react";
import "./Article.css";
import miniature from "../../../assets/ChatAssets/robot.jpg";
import avatar from "../../../assets/ChatAssets/Asistente.png";

function Article ({ onClickFunction, displayCheckbox }) {
    if (displayCheckbox) {
        return (
            <div className="article">
                <div className="article-image-container">
                    <img className="article-miniatura" src={miniature} alt="miniature"/>
                </div>
                <div className="article-info">
                    <div className="article-middle-text">
                        <h1 className="article-title">Curso de JavaScript</h1>
                        <h3 className="article-subtitle">Duración: 7 hrs</h3>
                    </div>
                    <div className="article-pricing">
                        <div className="article-origin">Universidad del Norte</div>
                        <div className="article-amount">$54.900</div>
                    </div>
                    <div className="article-line"></div>
                    <div className="article-rating">
                        <div className="article-avatar">
                            <img className="article-avatar-img" src={avatar} alt="avatar"/>
                        </div>
                        <div className="article-username">Prof. Juan Teherán</div>
                    </div>
                </div>
                <input type="checkbox" className="article-checkbox" onClick={onClickFunction}/>
            </div>
        );
    } else {
        return (
            <div className="article">
                <div className="article-image-container">
                    <img className="article-miniatura" src={miniature} alt="miniature"/>
                </div>
                <div className="article-info">
                    <div className="article-middle-text">
                        <h1 className="article-title">Curso de JavaScript</h1>
                        <h3 className="article-subtitle">Duración: 7 hrs</h3>
                    </div>
                    <div className="article-pricing">
                        <div className="article-origin">Universidad del Norte</div>
                        <div className="article-amount">$54.900</div>
                    </div>
                    <div className="article-line"></div>
                    <div className="article-rating">
                        <div className="article-avatar">
                            <img className="article-avatar-img" src={avatar} alt="avatar"/>
                        </div>
                        <div className="article-username">Prof. Juan Teherán</div>
                    </div>
                </div>
            </div>
        );
    }    
};

export default Article;
  