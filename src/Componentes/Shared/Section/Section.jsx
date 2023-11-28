import React from "react";
import "./Section.css";
import Article from "../Article/Article";

function Section ({ userType }) {
  const articleClick = (e) => {
    console.log(e);
  }

  let checkboxBool = (userType == 'admin');
  
  return (
    <section className="section-container">
      <Article
        onClickFunction={articleClick}
        displayCheckbox={checkboxBool}
      />
    </section>
  );
};
  
export default Section;
  