import React from "react";
import "./Article.css";
import miniature from "../../../assets/ChatAssets/robot.jpg";
import avatar from "../../../assets/ChatAssets/Asistente.png";

function Article ({ onClickFunction, displayCheckbox, articleTitle, articleSubtitle, articleInstitution, articlePriceAmount, articleAuthorName }) {
    if (displayCheckbox) {
        return (
            <div className="article">
                <div className="article-image-container">
                    <img className="article-miniatura" src={miniature} alt="miniature"/>
                </div>
                <div className="article-info">
                    <div className="article-middle-text">
                        <h1 className="article-title">{articleTitle}</h1>
                        <h3 className="article-subtitle">{articleSubtitle}</h3>
                    </div>
                    <div className="article-pricing">
                        <div className="article-origin">{articleInstitution}</div>
                        <div className="article-amount">{articlePriceAmount}</div>
                    </div>
                    <div className="article-line"></div>
                    <div className="article-rating">
                        <div className="article-avatar">
                            <img className="article-avatar-img" src={avatar} alt="avatar"/>
                        </div>
                        <div className="article-username">{articleAuthorName}</div>
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
                        <h1 className="article-title">{articleTitle}</h1>
                        <h3 className="article-subtitle">{articleSubtitle}</h3>
                    </div>
                    <div className="article-pricing">
                        <div className="article-origin">{articleInstitution}</div>
                        <div className="article-amount">{articlePriceAmount}</div>
                    </div>
                    <div className="article-line"></div>
                    <div className="article-rating">
                        <div className="article-avatar">
                            <img className="article-avatar-img" src={avatar} alt="avatar"/>
                        </div>
                        <div className="article-username">{articleAuthorName}</div>
                    </div>
                </div>
            </div>
        );
    }    
};

export default Article;
  