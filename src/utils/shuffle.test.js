const utils = require("./shuffle");

test("should shuffle array", () => {
  const arr = [1, 2, 3, 4];
  const result = utils.shuffleArray(arr);

  expect(arr).not.toBe(result); //the output array is not the same input array
  expect(arr).not.toEqual(result); //the array are different item to item

  result.sort((a, b) => a > b); //both array sorted are equal item to item
  expect(arr).toEqual(result);
});