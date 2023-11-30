import { React, useState } from "react";
import "./AdminBody.css";
import "./../ClientBody/ClientBody.css";
import TopBanner from "./../Shared/TopBanner/TopBanner";
import PromotionalBanner from "./../Shared/PromotionalBanner/PromotionalBanner";
import Pagination from '@mui/material/Pagination';
import TextField from "@mui/material/TextField";
import ArticleList from "../Shared/ArticleList/ArticleList"
import AdminControls from "../Shared/AdminControls/AdminControls";
import searchBg from "../../assets/Search/gradient.png";

const MAX_ARTICLES_PER_PAGE = 10;
const LOCAL_STORAGE_INDEX = "1";
const FIRST_PAGE = 1;
const SELECTED_ARTICLE_SEPARATOR = "-";

function AdminBody() {  
  const [desiredPageNumber, setPageNumber] = useState(1);
  const onPageChange = (e, page) => {
    setPageNumber(page);
  }

  const [storedData, setStoredData] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_INDEX)));
  const onStoredDataChange = (newData) => {
    localStorage.setItem(LOCAL_STORAGE_INDEX, JSON.stringify(newData));
    setStoredData(newData);
    return newData;
  }

  const [storedDataFiltered, setStoredDataFiltered] = useState(storedData);
  const onFilterChange = (inputText, data) => {
    const rawFilteredData = data.filter((el) => {
      if (inputText === '') {
        return el;
      }
      else {
        let lowerCaseArticleTitle = el.article_title.toLowerCase();
        return lowerCaseArticleTitle.includes(inputText) || lowerCaseArticleTitle == inputText;
      }     
    })
    setStoredDataFiltered(rawFilteredData);
    return rawFilteredData;
  }

  const [totalPageCount, setTotalPageCount] = useState(Math.ceil(Object.keys(storedData).length / MAX_ARTICLES_PER_PAGE));
  const onTotalPageCountChange = (newCount) => {
    setTotalPageCount(newCount);
  }

  let inputHandler = (e) => {
    let newStoredData = onStoredDataChange(JSON.parse(localStorage.getItem(LOCAL_STORAGE_INDEX)))

    var lowerCase = e.target.value.toLowerCase();
    setPageNumber(FIRST_PAGE);

    let newFilteredData = onFilterChange(lowerCase, newStoredData);
    let newPageCount = Math.ceil(Object.keys(newFilteredData).length / MAX_ARTICLES_PER_PAGE);
    onTotalPageCountChange(newPageCount);
  };

  const [selectedArticleIds, setSelectedArticles] = useState([]);
  const articleCheckboxClick = (e) => {
    let isChecked = e.target.checked;
    let listId = e.target.parentElement.parentElement.id;

    if (isChecked) {
      let pushedSelectedArticleIds = selectedArticleIds;
      pushedSelectedArticleIds.push(listId);
      setSelectedArticles(pushedSelectedArticleIds);
    } else {
      let remainingSelectedArticleIds = selectedArticleIds.filter(x => x != listId);
      setSelectedArticles(remainingSelectedArticleIds);
    }
  }

  const removeArticles = () => {
    let iteratedData = storedData;
    for (let index = 0; index < selectedArticleIds.length; index++) {
      let elementSplitArray = selectedArticleIds[index].split(SELECTED_ARTICLE_SEPARATOR);
      let actualElementArticleId = elementSplitArray[elementSplitArray.length - 1];

      iteratedData = iteratedData.filter(x => x.id != actualElementArticleId);
    }

    // Update pagination and data
    onStoredDataChange(iteratedData);
    setStoredDataFiltered(iteratedData);
    setSelectedArticles([]);

    let newPageCount = Math.ceil(Object.keys(iteratedData).length / MAX_ARTICLES_PER_PAGE);
    if (newPageCount < desiredPageNumber) {
      setPageNumber(newPageCount);
    }

    onTotalPageCountChange(newPageCount);
  }

  return (
    <div id="client-body">
      <TopBanner
        bannerText="¡Bienvenido al Marketplace de ReactJS, Admin!"
      />
      <div id="admin-dashboard">
        <img className="admin-search-bg" src={searchBg} alt="searchBg"/>
        <div className="admin-search-container">
          <div className="admin-search-div">
            <TextField
              id="admin-search-text-field"
              onChange={inputHandler}
              variant="filled"
              fullWidth
              label="Buscar artículos"
              color="secondary"
            />
          </div>
          <div id='admin-controls'>
            <AdminControls
              onClickRemoveArticles={removeArticles}
            />
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
            articleClick={articleCheckboxClick}
            userType="admin"
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
