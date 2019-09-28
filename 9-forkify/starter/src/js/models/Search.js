import axios from 'axios';
export default class Search {
  constructor(query){
    this.query = query;//query is what typed in the search field
  }
  //async function getResults(query){ //in method we don't use async function words, async optional
  async getResults(){
    const key = 'b039a3be435d2624497d5991a14ff673'
    try{
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = res.data.recipes;
      //console.log(this.result);
    } catch(error) {
      alert(error);
    }
  }
}
