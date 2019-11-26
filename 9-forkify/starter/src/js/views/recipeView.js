import {elements} from './base';
import {Fraction} from 'fractional';
import fracty from 'fracty';

export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
}

const formatCount = count => { //to convert values like 2.5 to 2 1/2
  if (count){
    const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));// array with two elements integer and decimal

    if (!dec) return count;//like if we have 2, then 2 is returned since there's no decimals

    if (int===0){//like 0.5
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`// 1/2

    }else{ //for 2.5, but avoid 5/2, need 2 1/2 instead
      const fr = new Fraction(count - int);//2.5-2
      return `${int} ${fr.numerator}/${fr.denominator}`//2 1/2
    }
  }
  return '?';//in case we don't have count
}
/*
How to properly convert decimals with trailing repeats like 1.3333333?

$ npm install fracty --save
Then in recipeView.js type:

import fracty from 'fracty';
and simply make your formatCount function look like this:

const formatCount = count => {
  if (count) {
    return `${fracty(count)}`;
  }
  return '?';
};
*/
//function to load all ingredient results on UI
const createIngredient = ingredient => `
<li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatCount(ingredient.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.ingredient}
    </div>
</li>
`
export const renderRecipe = recipe => {
  const markup = `
  <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
          <span>${recipe.title}</span>
      </h1>
  </figure>
  <div class="recipe__details">
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-stopwatch"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
          <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-man"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text"> servings</span>

          <div class="recipe__info-buttons">
              <button class="btn-tiny btn-decrease">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-minus"></use>
                  </svg>
              </button>
              <button class="btn-tiny btn-increase">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-plus"></use>
                  </svg>
              </button>
          </div>

      </div>
      <button class="recipe__love">
          <svg class="header__likes">
              <use href="img/icons.svg#icon-heart-outlined"></use>
          </svg>
      </button>
  </div>

  <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map(el => createIngredient(el)).join('')}
      </ul>

      <button class="btn-small recipe__btn recipe__btn--add">
          <svg class="search__icon">
              <use href="img/icons.svg#icon-shopping-cart"></use>
          </svg>
          <span>Add to shopping list</span>
      </button>
  </div>

  <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
      </p>
      <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-right"></use>
          </svg>

      </a>
  </div>
  `;
  elements.recipe.insertAdjacentHTML('afterbegin', markup)
};

export const updateServingsIngredients = recipe => {
  //Update Servings
  document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

  //Update ingredients
  const countElements = Array.from(document.querySelectorAll('.recipe__count'));
  countElements.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};
