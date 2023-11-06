import View from "./view";
import icons from "url:../../img/icons.svg";



class PaginationView extends View {
  _parentElem = document.querySelector(".pagination");
  
  addHandlerClick(handler) {
    this._parentElem.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    const previousPage = `
      <button data-goto="${curPage-1}"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>`;

    const nextPage = `
      <button data-goto="${curPage+1}"class="btn--inline pagination__btn--next">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span>Page ${curPage + 1}</span>
      </button>
    `;
    
    // Page 1 and there are no other pages
    if(curPage === 1 && numPages === 1) {
      return '';
    }

    // Page 1 and there are other pages
    if(curPage === 1 && numPages > 1) {
      return nextPage;
    }

    // Page middle
    if(curPage > 1 && curPage < numPages) {
      return `${previousPage}${nextPage}`;
    }

    // Last page
    if(curPage === numPages && numPages > 1) {
      return previousPage;
    }
  }
}

export default new PaginationView();



