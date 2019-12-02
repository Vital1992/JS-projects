export default class Likes {
  constructor(){
    this.likes = [];
  }

  addLike(id, title, author, img){
    const like = {id, title, author, img};
    this.likes.push(like);
    return like;
  }

  deleteLike(id){
    const index = this.likes.findIndex(el => el.id === id);

    // [2,4,8] splice(1,1) start at position 1 and take 1 element -> returns 4, original array is [2,8] - mutates arruy
    // [2,4,8] slice(1,1) returns 4, original array is [2,4,8] - doesn't mutate array
    this.likes.splice(index, 1);
  }

  isLiked(id){
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes(){
    return this.likes.length;
  }
}
