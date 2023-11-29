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
  const [desiredPageNumber, setPageNumber] = useState(1);
  const onPageChange = (e, page) => {
    setPageNumber(page);
  }

  const [storedData, setStoredData] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_INDEX)));
  const onStoredDataChange = (newData) => {
    setStoredData(newData);
    return newData;
  }

  const [storedDataFiltered, setStoredDataFiltered] = useState(storedData);
  const onFilterChange = (inputText, data) => {
    const rawFilteredData = data.filter((el) => {
      //if no input the return the original
      if (inputText === '') {
        return el;
      }
      //return the item which contains the user input
      else {
        let lowerCaseArticleTitle = el.article_title.toLowerCase();
        return lowerCaseArticleTitle.includes(inputText) || lowerCaseArticleTitle == inputText;
      }     
    })
    setStoredDataFiltered(rawFilteredData);
    return rawFilteredData;
  }

  const [totalPageCount, setTotalPageCount] = useState(Math.floor(Object.keys(storedData).length / MAX_ARTICLES_PER_PAGE + 1));
  const onTotalPageCountChange = (newCount) => {
    setTotalPageCount(newCount);
  }

  let inputHandler = (e) => {
    let newStoredData = onStoredDataChange(JSON.parse(localStorage.getItem(LOCAL_STORAGE_INDEX)))
    console.log(newStoredData);

    var lowerCase = e.target.value.toLowerCase();
    setPageNumber(FIRST_PAGE);

    let newFilteredData = onFilterChange(lowerCase, newStoredData);
    console.log(newFilteredData)
    let newPageCount = Math.floor(Object.keys(newFilteredData).length / MAX_ARTICLES_PER_PAGE + 1);
    onTotalPageCountChange(newPageCount);
  };

  return (
    <div id="client-body">
      <TopBanner
        bannerText="¡Bienvenido al Marketplace de ReactJS, Admin!"
      />
      <div id="admin-dashboard">
        <div className="admin-search-container">
          <div className="admin-search-div">
            <TextField
              id="admin-search-text-field"
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
