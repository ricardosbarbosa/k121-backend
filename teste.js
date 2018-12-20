let array = [1,2,3,4,5,6];
for (var i = array.length - 1; i >= 0; i--) {
  let index = Math.floor(Math.random() * array.length)
  console.log(array[index]);
  
  array.splice(index, 1);
  console.log(array, );
}