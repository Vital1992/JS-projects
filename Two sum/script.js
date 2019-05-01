//Two sum problem
/*Given an array of integers, return indices of 
two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solutionand you may not use the same element twice.

Example:
Given nums = [10, 2, 3, 7, 11, 15], target = 9,
Because nums[1] + nums[3] = 2 + 7 = 9,
return [1, 3].
*/
// our two sum function which will return
// all pairs in the array that sum up to S
function twoSum(arr, S) {
  var sums = [];
  // check each element in array
  for (var i = 0; i < arr.length; i++) {
    // check each other element in the array
    for (var j = i + 1; j < arr.length; j++) {
      // determine if these two elements sum to S
      if (arr[i] + arr[j] === S) {
        //If we want to return nums itself: sums.push([arr[i], arr[j]]); 
        sums.push(i,j);
      }
    }
  }
  // return all pairs of integers that sum to S
  return sums;
}
console.log(twoSum([10, 2, 3, 7, 11, 15], 9));
