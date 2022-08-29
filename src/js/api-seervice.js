export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }
    
    fetchArticles() {
        fetch(`https://pixabay.com/api/?key=29530903-57a4a13660c15182aca557193&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            .then(response => response.json())
            .then(data => {
                this.incrementPage();
            }
                )
        .catch(error => console.log(error))
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}