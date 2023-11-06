class SearchView {
    #parentElem = document.querySelector('.search');

    getQuery() {
        const query =  this.#parentElem.querySelector(".search__field").value;
        this.#clearInput();
        return query;
    }

    #clearInput() {
        this.#parentElem.querySelector(".search__field").value = '';
        this.#parentElem.querySelector(".search__field").blur();
    }
    
    addHandlerSearch(handler) {
        this.#parentElem.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();