 import PreviewView from "./previewView.js";

class BookmarksView extends PreviewView {
  _parentElem = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  addHandlerRender(handler) {
    window.addEventListener('load',handler);
  }
}

export default new BookmarksView();