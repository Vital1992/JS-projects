import {elements} from './base';

export const getInput = () => {
  return [elements.addItemCount.value, elements.addItemUnit.value, elements.addItem.value];
}//get value from the add item and quantity fields

export const clearInput = () => {
  elements.addItemCount.value=''
  elements.addItemUnit.value=''
  elements.addItem.value=''
};

export const renderItem = item => {
  const markup =`
  <li class="shopping__item" data-itemid=${item.id}>
      <div class="shopping__count">
          <input type="number" value="${item.count}" step="${item.count}" min = "0" class="shopping__count-value">
          <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.ingredient}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
  </li>
  `;
  elements.shopping.insertAdjacentHTML('beforeend', markup);
}
//Render Delete all recipes button
export const renderButton = () => {
  const markup =`
  <button class="btn delete-all">
      <span>Delete all ingredients</span>
  </button>
  `;
  elements.shopping.insertAdjacentHTML('afterend', markup);
}

export const deleteItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
}

export const deleteButton = id => {
const btn = document.querySelector(`.delete-all`);
btn.parentElement.removeChild(btn);
}
