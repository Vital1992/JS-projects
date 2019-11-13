import axios from 'axios';
import {key, proxy} from '../config';
export default class Recipe {
  constructor(id){
    this.id = id;
  }
  //async function getResults(query){ //in method we don't use async function words, async optional
  async getRecipe(){
    try{
      const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      //console.log(res);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch(error) {
      console.log(error);
    }
  }
  calcTime(){// assuming that we need 15 mins for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng/3);
    this.time = periods*15;
  }
  calcServings(){
    this.servings = 4;
  }
  parseIngredients(){
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitShort, 'kg', 'g']

    const newIngredients = this.ingredients.map(el=>{//loop thru all ingredients array

      //1. Uniform units
      let ingredient = el.toLowerCase();//make each word lowercase
      unitsLong.forEach((unit, i)=>{//loop thru unitsLong and when any of words from unitsLong found in ingredient array, we replace it with the word from unitShort
        ingredient = ingredient.replace(unit, unitShort[i]);
      });

      //2. Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      //3. Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));//includes returns true if element that we are passing is in array, false if not
      //so findIndex will return an index of element for which includes returned true

      let objIng;
      if (unitIndex > -1){
        //there's a unit
        const arrCount = arrIng.slice(0, unitIndex);//example: 1 1/2 tbsp, so '1', '1/2' will be in arrCount
        let count;
        if (arrCount.length === 1){//example: 1 tbsp
          count = eval(arrIng[0].replace('-','+'));//replace - to + in case we got 1-1/2 tbsp, then eval will sum two elements
        } else {//example: 1 1/2 tbsp
          count = eval(arrIng.slice(0, unitIndex).join('+'));//joint to combine arr into string and put + between elements
          //eval can sum strings, like eval("1+1/2")=1.5
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex+1).join(' ')
        }

      }else if (parseInt(arrIng[0], 10)){//if there's a number at position 0, like ['1', 'bread']
        //There's no unit, but 1st element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')//entire array except for the first element which is a number //use join to put array into the string
        }
      }else if (unitIndex === -1){//there's no elements from unitShort, so therefore no numbers to count
        //There's no unit and no number in 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }
}
