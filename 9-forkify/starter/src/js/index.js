// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';

/* Global state of the app
- Search Object
- Current recipe Object
- Shopping list Object
- Liked recipes
*/
const state = {};
window.state = state;
//*Search Controller*
const controlSearch = async () => {
  //1. Get query from view
  const query = searchView.getInput();//calling getInput fun to get value from search field
  console.log(query)

  if (query) {
    //2. New search obj and add to state
    state.search = new Search(query);

    //3. Prepare UI for Results
    searchView.clearInput();//clear input field
    searchView.clearResults();//clear results
    renderLoader(elements.searchRes);//loading spinner

    try{
      //4. Search for recipes
      await state.search.getResults();// wait for result from getResults()

      //5. Render results on UI
      clearLoader();//remove spinner
      searchView.renderResults(state.search.result);//render all recepies and show them on the webpage
    }catch (err){
      alert('Something went wrong');
      clearLoader();
    }
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault(); //The preventDefault() method cancels the event if it is cancelable,
  //meaning that the default action that belongs to the event will not occur. For example,
  //this can be useful when: Clicking on a "Submit" button, prevent it from submitting a form.
  //Clicking on a link, prevent the link from following the URL.
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline')//closest() method traverses parents (heading toward the document root) of the
  //Element until it finds a node that matches the provided selectorString. Will return itself or the matching ancestor.
  //If no such element exists, it returns null
  if (btn){
    const goToPage = parseInt(btn.dataset.goto, 10) //dataset reads data-goto=${type === 'prev' ? page-1 : page+1}
    //10 means from 0 to 9
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage); //load new page with the rest of results
  }
})

//*Recipe Controller*
const controlRecipe = async () => {
  //Get ID from URL
  const id = window.location.hash.replace('#','');//to remove # and leave only id
  /*
  For an URL like http://localhost:8080/#47746
hash return the part of the URL that follows the # symbol, including the # symbol.
You can listen for the hashchange event to get notified of changes to the hash in supporting browsers.
  */
  console.log(id);
  if (id){
    //Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //highlight selected search item
    if (state.search){
      searchView.highlightSelected(id);
    }

    //Create new recipe Object
    state.recipe = new Recipe(id);

    try {
      //Get recipe data and pasre ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      //Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //Render recipe
      clearLoader();
      recipeView.renderRecipe(
        state.recipe,
        state.likes.isLiked(id)
      );

    } catch (err) {
      alert ('Error processing recipe');
    }
  }
};
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));//instead of above

//List Controller

const controlList = () => {
  //Create new list if there's none yet
  if (!state.list) state.list = new List();

  //Add each ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  })
}

//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  //Handle the delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {

  //Delete from state
  state.list.deleteItem(id);
  //Delete from UI
  listView.deleteItem(id);
  //Handle the count update
} else if (e.target.matches('.shopping__count-value')){
  if (e.target.value > 0){
  const val = parseFloat(e.target.value, 10) //value of element that was clicked
  state.list.updateCount(id, val);
}
}
});

//Like controller

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  //User has not yet liked current recipe
  if (!state.likes.isLiked(currentID)){
    //Add likes to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    //Toggle the like button
    likesView.toggleLikeBtn(true);
    //Add like to the UI list
    likesView.renderLike(newLike);

  //User has liked current recipe
  }else{
    //Remove like from the state
    state.likes.deleteLike(currentID);
    //Toggle the like buttons
    likesView.toggleLikeBtn(false);
    //Remove like from UI list
    likesView.deleteLike(currentID);

  }
  likesView.toggleLikeMenu(state.likes.getNumLikes);
};


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')){//* means that also if any child of btn-decrease matches
    //Decrease button is clicked
    if (state.recipe.servings > 1){
    state.recipe.updateServings('dec');
    recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')){
    //Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
    console.log(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, recipe__btn--add *')){
    //Add ingredientsto the shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')){
    //Like Controller
    controlLike();
  }

});

window.l = new List();
/* Bugs:
1. When not results found from search, 'undefined' returned
2. When adding the same recipes in the shopping list, they won't add up


*/
