import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '25766392-01b12b6ed5ab34bc2910d9c3e';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchArticles() {
        try {
            const response = await axios.get(`/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
            this.pageUpdate();
            return response
        } catch (error) {
            console.log('error')
        }
    }

    pageUpdate() {
        this.page += 1;
    }

    pageReset() {
        this.page = 1;
    }   
}