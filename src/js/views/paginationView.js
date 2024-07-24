import View from './view';

import icons from 'url:../../img/icons.svg'; // parcel 2

import { Fraction } from 'fractional';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextPageMarkup(curPage);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevPageMarkup(curPage);
    }
    // Other page
    if (curPage < numPages) {
      return this._generateBothPaginationBtn(curPage);
    }
    // Page 1, and there are NO other pages
    return '';
  }

  _generateNextPageMarkup(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span> Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  _generatePrevPageMarkup(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span> Page ${curPage - 1}</span>
          </button>
    `;
  }

  _generateBothPaginationBtn(curPage) {
    return (
      this._generatePrevPageMarkup(curPage) +
      this._generateNextPageMarkup(curPage)
    );
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = Number(btn.dataset.goto);
      console.log(gotoPage);
      handler(gotoPage);
    });
  }
}

export default new PaginationView();
