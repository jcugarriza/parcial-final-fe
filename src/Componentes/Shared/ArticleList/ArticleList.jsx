import { React } from 'react'
import Article from "../Article/Article";
import "./ArticleList.css";

const ARTICLE_LIST_STARTING_INDEX = 1;

function List(props) {
    const articleClick = (e) => {
        console.log(e);
    }
    
    let dataFetchIndexLowerLimit = (props.desiredPageNumber - 1) * props.articleListMaxPageArticleCount + ARTICLE_LIST_STARTING_INDEX;
    let dataFetchIndexUpperLimit = dataFetchIndexLowerLimit + props.articleListMaxPageArticleCount - ARTICLE_LIST_STARTING_INDEX;

    const filteredData = props.data.filter((el) => {
        let elIndex = props.data.findIndex(x => x.id == el.id) + 1;
        if (elIndex >= dataFetchIndexLowerLimit && elIndex <= dataFetchIndexUpperLimit) {
            return el;
        }        
    })
    return (
        <ul id="article-list-ul">
            {filteredData.map((item) => (
                <li key={item.id} className='article-list-li'>
                    <Article
                        onClickFunction={articleClick}
                        displayCheckbox={props.checkboxBool}
                        articleTitle={item.article_title}
                        articleSubtitle={item.article_subtitle}
                        articleInstitution={item.article_institution}
                        articlePriceAmount={item.article_price_amount}
                        articleAuthorName={item.article_author_name}
                    />
                </li>
            ))}
        </ul>
    )
}

export default List