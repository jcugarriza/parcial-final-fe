import { React, useState } from "react";
import "./AdminBody.css";
import "./../ClientBody/ClientBody.css";
import TopBanner from "./../Shared/TopBanner/TopBanner";
import PromotionalBanner from "./../Shared/PromotionalBanner/PromotionalBanner";
import Pagination from '@mui/material/Pagination';
import TextField from "@mui/material/TextField";
import ArticleList from "../Shared/ArticleList/ArticleList"
import AdminControls from "../Shared/AdminControls/AdminControls";

const MAX_ARTICLES_PER_PAGE = 10;
const LOCAL_STORAGE_INDEX = "1";
const FIRST_PAGE = 1;

function AdminBody() {
  var storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_INDEX));
  let initialTotalPageCount = Math.floor(Object.keys(storedData).length / MAX_ARTICLES_PER_PAGE + 1);
  
  const [desiredPageNumber, setPageNumber] = useState(1);
  const onPageChange = (e, page) => {
    setPageNumber(page);
  }

  const [storedDataFiltered, setStoredDataFiltered] = useState(storedData);
  const onStoredDataChange = (inputText) => {
    const rawFilteredData = storedData.filter((el) => {
      //if no input the return the original
      if (inputText === '') {
        return el;
      }
      //return the item which contains the user input
      else {
          return el.article_title.toLowerCase().includes(inputText)
      }     
    })
    setStoredDataFiltered(rawFilteredData);
    return rawFilteredData;
  }

  const [totalPageCount, setTotalPageCount] = useState(initialTotalPageCount);
  const onTotalPageCountChange = (newCount) => {
    setTotalPageCount(newCount);
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setPageNumber(FIRST_PAGE);

    let newData = onStoredDataChange(lowerCase);
    let newPageCount = Math.floor(Object.keys(newData).length / MAX_ARTICLES_PER_PAGE + 1);
    onTotalPageCountChange(newPageCount);
  };

  return (
    <div id="client-body">
      <TopBanner
        bannerText="¡Bienvenido al Marketplace de ReactJS, Admin!"
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
          <div id='admin-controls'>
            <AdminControls/>
          </div>
        </div>
        <div className="client-spacer"></div>
        <PromotionalBanner id="client-promotional-banner"/>
        <div className="client-spacer"></div>
        <div id="client-presection-div">
          <ArticleList
            checkboxBool="true"
            articleListMaxPageArticleCount={MAX_ARTICLES_PER_PAGE}
            desiredPageNumber={desiredPageNumber}
            data={storedDataFiltered}
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

export default AdminBody;
