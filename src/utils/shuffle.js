const shuffleArray = list => {
  const result = new Array(...list)
  result.forEach((_, index, arr) => {
    const j = index + Math.floor(Math.random() * (arr.length - index))
    const temp = arr[index]
    result[index] = arr[j]
    result[j] = temp
  })
  return result
}

module.exports = {
  shuffleArray
}
