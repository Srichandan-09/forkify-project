import icons from "url:../../img/icons.svg";


export default class View {
  _data;

  /**
   * Render the recieved object to DOM
   * @param {Object | Object[]} data The data to be rendered(e.g. recipe)
   * @returns {undefined}
   * @this {Object} View instance
   * @author Chandan
   * @todo Finish implmentation
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if(!markup) return;
    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }


  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElem.querySelectorAll('*'));

    newElements.forEach((newEl,i) => {
      const curEl = curElements[i];
      
      // Updates changed TEXT
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }
      
      // Updates changed ATTRIBUTES
      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }

    });
  }


  renderSpinner() {
    const markup = `<div class="spinner">
            <svg>
                <use href="${icons}.svg#icon-loader"></use>
            </svg>
        </div>`;

    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }


  renderError(message = this._errorMessage) {
    const errMsg = message.includes("Invalid _id:")
      ? this._errorMessage
      : message;
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errMsg}</p>
        </div>`;

    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }


  renderSuccess(message = this._successMessage) {
    const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;

    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }


  _clear() {
    this._parentElem.innerHTML = "";
  }
}
