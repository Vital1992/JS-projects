// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'
import {elements, renderLoader, clearLoader} from './views/base';

/* Global state of the app
- Search Object
- Current recipe Object
- Shopping list Object
- Liked recipes
*/
const state = {};

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
  const btn = e.target.closest('.btn-inline')
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

    //Create new recipe Object
    state.recipe = new Recipe(id);

    try {
      //Get recipe data
      await state.recipe.getRecipe();

      //Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //Render recipe
      console.log(state.recipe)
    } catch (err) {
      alert ('Error processing recipe');
    }
  }
};
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));//instead of above
