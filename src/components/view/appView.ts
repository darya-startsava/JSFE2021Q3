import News from './news/news';
import Sources from './sources/sources';
import ResponseObjectArticles from '../interfaces/responseObjectArticles';
import ResponseObjectSources from '../interfaces/responseObjectSources';

export class AppView {
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }
    news: News;
    sources: Sources;

    drawNews(data: ResponseObjectArticles) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResponseObjectSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
