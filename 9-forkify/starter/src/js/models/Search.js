import axios from 'axios';
import {key, proxy} from '../config';
export default class Search {
  constructor(query){
    this.query = query;//query is what typed in the search field
  }
  //async function getResults(query){ //in method we don't use async function words, async optional
  async getResults(){
    try{
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      this.result = res.data.recipes;
      //console.log(res);
    } catch(error) {
      alert(error);
    }
  }
}
