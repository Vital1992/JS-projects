export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResList: document.querySelector('.results__list'),
  searchRes: document.querySelector('.results'),
  searchResPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list'),
  addItemUnit: document.querySelector('.add_unit'),
  addItem: document.querySelector('.add_ingredient'),
  addItemCount: document.querySelector('.add_count'),
  addListBtn: document.querySelector('.add_item__btn')
};

export const elementStrings = {
  loader: 'loader'
};

export const renderLoader = parent => { //loading spinner
  const loader = `
  <div class="${elementStrings.loader}">
   <svg>
    <use href="img/icons.svg#icon-cw"></use>
   </svg>
  </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => { //remove loading spinner
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader){
    loader.parentElement.removeChild(loader);
  }
};
