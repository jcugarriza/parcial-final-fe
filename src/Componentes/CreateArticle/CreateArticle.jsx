import { React, useState, useEffect } from "react";
import "./CreateArticle.css";
import CreateArticleTopBanner from "./../Shared/CreateArticleTopBanner/CreateArticleTopBanner";
import { useNavigate } from 'react-router-dom';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { ArticleDataObject } from "../Shared/ArticleData/ArticleDataObject.js"

const LOCAL_STORAGE_INDEX = "1";

function CreateArticle() {
    const navigateTo = useNavigate();
    
    // Se almacenan los inputs
    const [articleTitle, setArticleTitle] = useState("");
    const [articleSubtitle, setArticleSubtitle] = useState("");
    const [articleInstitution, setArticleInstitution] = useState("");
    const [articlePrice, setArticlePrice] = useState("");
    const [articleAuthor, setArticleAuthor] = useState("");

    // Mensaje de estado del log in
    const [articleSaveStatus, setArticleSaveStatus] = useState("");
    const [statusHolder, setStatusHolder] = useState("message");

    const guardarArticulo = (e) => {
        e.preventDefault();

        if (articleTitle.length == 0 || articleSubtitle.length == 0 || articleInstitution.length == 0 || articlePrice.length == 0 || articleAuthor.length == 0) {
            setArticleSaveStatus('Algunos de los campos están vacíos');
        } else {
            let localStorageArticles = JSON.parse(localStorage.getItem(LOCAL_STORAGE_INDEX));

            let newId = localStorageArticles[localStorageArticles.length - 1].id;
            let newArticle = new ArticleDataObject(newId + 1, articleTitle, articleSubtitle, articleInstitution, articlePrice, articleAuthor);
            let dataToInsert = JSON.stringify(newArticle.toArray());
            
            localStorageArticles.push(JSON.parse(dataToInsert))
            localStorage.setItem(LOCAL_STORAGE_INDEX, JSON.stringify(localStorageArticles));
            
            setArticleSaveStatus('Artículo guardado con éxito');
            navigateTo('/admin')
        }
    }

    const onSubmit = () => {
        setArticleTitle('');
        setArticleSubtitle('');
        setArticleInstitution('');
        setArticlePrice('');
        setArticleAuthor('');
    }

    useEffect(() => {
        if (articleSaveStatus !== '') {
            setStatusHolder('showMessage')
        }
    }, [articleSaveStatus])

    return (
        <div id="create-article-body">
            <CreateArticleTopBanner/>
            <div id="create-article-dashboard">
                <form action="" className="create-article-form" onSubmit={onSubmit}>
                    <span id="create-article-form-status" className={statusHolder}>{articleSaveStatus}</span>
                    <div className="input-div">
                        <label htmlFor="article-title">Título del artículo</label>
                        <div className="input-flex">
                            <input
                                type="text"
                                id="articletitle"
                                placeholder="Ingresa un título"
                                onChange={(event) => {
                                    setArticleTitle(event.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className="input-div">
                        <label htmlFor="article-subtitle">Subtítulo</label>
                        <div className="input-flex">
                            <input
                                type="text"
                                id="articlesubtitle"
                                placeholder="Ingresa un subtítulo"
                                onChange={(event) => {
                                    setArticleSubtitle(event.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className="input-div">
                        <label htmlFor="article-institution">Institución</label>
                        <div className="input-flex">
                            <input
                                type="text"
                                id="articleinstitution"
                                placeholder="Ingresa una institución"
                                onChange={(event) => {
                                    setArticleInstitution(event.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className="input-div">
                        <label htmlFor="article-price">Precio</label>
                        <div className="input-flex">
                            <input
                                type="text"
                                id="articleprice"
                                placeholder="Ingresa un precio"
                                onChange={(event) => {
                                    setArticlePrice(event.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className="input-div">
                        <label htmlFor="article-author">Autor</label>
                        <div className="input-flex">
                            <input
                                type="text"
                                id="articleauthor"
                                placeholder="Ingresa el autor"
                                onChange={(event) => {
                                    setArticleAuthor(event.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-flex" onClick={guardarArticulo}>
                        <span>Guardar</span>
                        <AiOutlineSwapRight className="icon"/>
                    </button>
                </form>
            </div>
            <div id="create-article-author-copyright-text">Desarrollado por Juan Carlos Ugarriza Verbel - © 2023</div>
        </div>
    );
};

export default CreateArticle;
