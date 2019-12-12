import {elements} from './base';
export const getInput = () => elements.searchInput.value;//get value from the search field
export const clearInput = () => {
  elements.searchInput.value=''
};

export const clearResults = () => {
  elements.searchResList.innerHTML = ' ';//clear results HTML
  elements.searchResPages.innerHTML = ' ';//clear buttons HTML
};

export const highlightSelected = id => {//to highlight selected dish
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));//select all and remove highlight
  resultsArr.forEach(el => {
    el.classList.remove(`results__link--active`);
  })
  document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}

export const limitRecipeTitle = (title, limit=17) => { //limit results to one line in the results column
  const newTitle = [];
  if (title.length > limit){
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit){
        newTitle.push(cur);
      }
      return acc + cur.length; //to update accumulator
    }, 0);//0 to include accumulator in the newTitle array
    //return the result
    return `${newTitle.join(' ')}...`; //concure array in string by space and add ... to the end
  }
    return title; //just return title if it's < limit
};

const renderRecipe = recipe => {
  const markup = `
  <li>
      <a class="results__link results__link--active" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>
  `;//adding HTML with images and names into the page
    elements.searchResList.insertAdjacentHTML('beforeend', markup)
};

//Adding HTML Prev and Next buttons
//type: 'prev' or 'next'
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
<span>Page ${type === 'prev' ? page-1 : page+1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button>
`; //if button is for previous page, we show cur page-1 num if for next cur page+1

const renderButtons = (page, numResults, resPerPage) => { //choose what buttons to show and call button HTML
  const pages = Math.ceil(numResults/resPerPage); //Math.ceil to round 4,1 or 4,5 to 5

  let button;
  if(page === 1 && pages > 1){
    //Only button to go to the next page
    button = createButton(page, 'next');
  }else if(page < pages){
    //Both buttons
    button = `
    ${createButton(page, 'next')}
    ${createButton(page, 'prev')}
    `;
  }else if (page === pages && pages > 1){
    //Only button to go to prev page
    button = createButton(page, 'prev');
  }
  elements.searchResPages.insertAdjacentHTML('afterbegin', button)
};

export const renderResults = (recipes, page=1, resPerPage=10) => {

  //render results of current page
  const start = (page-1) * resPerPage;
  const end = page * resPerPage;

  if (recipes.length !==0){ //if we have results in array we show them
  recipes.slice(start, end).forEach(renderRecipe);//loop thru all recipes
  //render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
  
  }else{ //ortherwise show no results message
    elements.searchResList.insertAdjacentHTML('beforeend', `<h2 class="heading-2">No recipes found</h2>`)
  }
};
