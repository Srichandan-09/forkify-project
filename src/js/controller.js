// import 'core-js/stable';
// import 'regenerator-runtime/runtime'
// import { async } from 'regenerator-runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { SEARCH_FAIL_SEC, MODAL_SUCCESS_ERROR_SEC, MODAL_CLOSE_SEC } from './config.js';



// if(module.hot) {
//   module.hot.accept();
// }



const controlRecipes = async function() {
  try {
    // Getting the hash(id)
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // Update bookmarks view to mark selected bookmark
    bookmarksView.update(model.state.bookmarks);

    // Loading Spinner
    recipeView.renderSpinner();

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering recipe on page
    recipeView.render(model.state.recipe);
  } 
  catch (err) {
    recipeView.renderError(err);
  }
} 



const controlSearchResults = async function() {
  try {
    // Loading spinner
    resultsView.renderSpinner();

    // Getting the search input(query)
    const query = searchView.getQuery();
    if (!query) {
      resultsView.renderSpinner();
      setTimeout(function () {
        return;
      }, SEARCH_FAIL_SEC);
    }

    // Loading search results
    await model.loadSearchResults(query);

    // Render recipe list on page
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } 
  catch(err) {
    resultsView.renderError(err)
  }
}



const controlPagination = function(goToPage) {
  // Render new recipe list on page
  resultsView.render(model.getSearchResultsPage(goToPage));

  // // Render new pagination buttons
  paginationView.render(model.state.search);
}



const controlServings = function(newServings) {
  // Update the recipe servings in state
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
}



const controlAddBookmark = function(recipe) {
  // Add/Delete bookmark
  if(!model.state.recipe.bookmarked) 
    model.addBookmarks(model.state.recipe);
  else 
    model.deleteBookmark(model.state.recipe.id);

  // Update the recipe view
  recipeView.update(model.state.recipe);

  // Render bookmark view
  bookmarksView.render(model.state.bookmarks);
}



const controlBookmarks = function() {
  model.restoreBookmarks();
  bookmarksView.render(model.state.bookmarks);
}



const controlAddRecipe = async function(newRecipe) {
  try {
    // Loading spinner
    addRecipeView.renderSpinner();

    // Upload new Recipe
    await model.uploadRecipe(newRecipe);

    // Display in recipe
    recipeView.render(model.state.recipe);

    // Change id in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Display in bookmarks
    bookmarksView.render(model.state.bookmarks);

    // Success Message
    setTimeout(function () {
      addRecipeView.renderSuccess();
    }, MODAL_SUCCESS_ERROR_SEC);

    // Close form window
    setTimeout(function () {
      addRecipeView.removeWindow();
    }, MODAL_CLOSE_SEC);
  }
  catch(err) {
    addRecipeView.renderSpinner();
    setTimeout(function () {
      addRecipeView.renderError(err);
    }, MODAL_SUCCESS_ERROR_SEC);
  }
}



const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUploadRecipe(controlAddRecipe);
}
init();