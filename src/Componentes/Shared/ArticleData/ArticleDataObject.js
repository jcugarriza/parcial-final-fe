export class ArticleDataObject {
    constructor(id, article_title, article_subtitle, article_institution, article_price_amount, article_author_name) {
      this.id = id;
      this.article_title = article_title;
      this.article_subtitle = article_subtitle;
      this.article_institution = article_institution;
      this.article_price_amount = article_price_amount;
      this.article_author_name = article_author_name;
    }

    toArray() {
        return {
          "id" : this.id,
          "article_title" : this.article_title,
          "article_subtitle" : this.article_subtitle,
          "article_institution" : this.article_institution,
          "article_price_amount" : this.article_price_amount,
          "article_author_name" : this.article_author_name
        };
    }
  }