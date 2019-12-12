import uniqid from 'uniqid';

export default class List {
  constructor(){
    this.items = [];
  }

  addItem(count, unit, ingredient){
    const item = {
      id: uniqid(), //using uniqid from uniqid package to have qnique id for each element
      count, //or: count: count;
      unit,
      ingredient
    }
    this.items.push(item);
    return item
  }
    deleteItem(id){
      const index = this.items.findIndex(el => el.id === id);

      // [2,4,8] splice(1,1) start at position 1 and take 1 element -> returns 4, original array is [2,8] - mutates arruy
      // [2,4,8] slice(1,1) returns 4, original array is [2,4,8] - doesn't mutate array
      this.items.splice(index, 1);
    }

    updateCount(id, newCount){
      this.items.find(el => el.id === id).count = newCount //will return element itself, not index and then change the count property
    }
    deleteAll(){
      this.items = []
    }
  }

/* Map will be better soluton
import uniqid from 'uniqid';

export default class ShoppingList {
    constructor(){
        this.list = new Map();
    };

    add_item(count,unit,ingredient){
        this.list.set(uniqid(),{
            count : count,
            unit : unit,
            ingredient : ingredient
        });
    };

    delete_item(id){
        if (this.list.has(id)){
            this.list.delete(id)
        };
    };

    update_count(id,count){
        let value ;
        if (this.list.has(id)){
            value = this.list.get(id);
            value.count = count;
            this.list.set(id,value);
        };
    };
};


a typical list deletion or update operation takes O(N) times however a Map takes O(1)
*/
