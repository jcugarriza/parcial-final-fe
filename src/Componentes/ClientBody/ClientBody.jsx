import { React, useState } from "react";
import "./ClientBody.css";
import TopBanner from "./../Shared/TopBanner/TopBanner";
import PromotionalBanner from "./../Shared/PromotionalBanner/PromotionalBanner";
import Pagination from '@mui/material/Pagination';
import TextField from "@mui/material/TextField";
import List from "../Shared/ArticleList/ArticleList"

const MAX_ARTICLES_PER_PAGE = 10;
const LOCAL_STORAGE_INDEX = "1";
const FIRST_PAGE = 1;

function ClientBody() {
  var storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_INDEX));
  let totalPageCount = Math.floor(Object.keys(storedData).length / MAX_ARTICLES_PER_PAGE + 1);

  const [desiredPageNumber, setPageNumber] = useState(1);
  const onPageChange = (e, page) => {
    setPageNumber(page);
  }

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    setPageNumber(FIRST_PAGE);
  };

  return (
    <div id="client-body">
      <TopBanner
        bannerText="¡Bienvenido al Marketplace de ReactJS, Cliente!"
        userType="client"
      />
      <div id="client-dashboard">
        <div className="search-container">
          <div className="search-div">
            <TextField
              id="search-text-field"
              onChange={inputHandler}
              variant="outlined"
              fullWidth
              label="Buscar artículos"
              color="primary"
            />
          </div>
        </div>
        <div className="client-spacer"></div>
        <PromotionalBanner id="client-promotional-banner"/>
        <div className="client-spacer"></div>
        <div id="client-presection-div">
          <List
            input={inputText}
            checkboxBool="true"
            articleListMaxPageArticleCount={MAX_ARTICLES_PER_PAGE}
            desiredPageNumber={desiredPageNumber}
            data={storedData}
          />
        </div>
      </div>
      <div id='client-pagination-div'>
        <Pagination id="client-pagination"
          count={totalPageCount}
          siblingCount={1}
          page={desiredPageNumber}
          shape="circular"
          size="large"
          variant="outlined"
          defaultPage={FIRST_PAGE}
          onChange={onPageChange}
        />
      </div>
      <div id="client-author-copyright-text">Desarrollado por Juan Carlos Ugarriza Verbel - © 2023</div>
    </div>
  );
};

export default ClientBody;
