// Global app controller
import Search from './models/Search';

/* Global state of the app
- Search Object
- Current recipe Object
- Shopping list Object
- Liked recipes
*/
const state = {};

const controlSearch = async () => {
  //1. Get query from view
  const query = 'pizza' //TODO

  if (query) {
    //2. New search obj and add to state
    state.search = new Search(query);

    //3. Prepare UI for Results

    //4. Search for recipes
    await state.search.getResults();// wait for result from getResults()

    //5. Render results on UI
    console.log(state.search.result)
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault(); //The preventDefault() method cancels the event if it is cancelable,
  //meaning that the default action that belongs to the event will not occur. For example,
  //this can be useful when: Clicking on a "Submit" button, prevent it from submitting a form.
  //Clicking on a link, prevent the link from following the URL.
  controlSearch();
});
