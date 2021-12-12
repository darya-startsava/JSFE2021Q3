import Article from './articleInterface';

export default interface ResponseObjectArticles {
    status: string;
    totalResults: string;
    articles: Array<Article>;
}
