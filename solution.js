/* 
  The task
  Within the text file Sagittarius.txt there are numbers.
  You should read the file, extract the numbers and console.log
  the following:
    1/. The maximum number ( eg. console.log(`Max. number: ${maxNum}`))
    2/. The minmumm number
    3/. The sum of the numbers
    4/. The average of the numbers
    5/. console.log the subset of numbers greater than 1000. 

  Use whatever functions or libraries that you need to accomplish
  this task.
*/

const readFile = require('fs-readfile-promise')

// Generic curried functions...
const Identity = x => x
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const map = fn => coll => Array.prototype.map.call(coll,fn)
const filter = fn => coll => Array.prototype.filter.call(coll,fn)
const reduce = init => fn => coll => Array.prototype.reduce.call(coll,fn, init)
// replace :: regex -> String -> String -> String
const replace = (regex, _with) => string => String.prototype.replace.call(string, regex, _with)
const match = regex => string => String.prototype.match.call(string, regex)
const sum = (a,b) => a+b
const totalListOfNumbers = reduce(0)(sum)
// stripComma :: String -> String
const stripComma = replace(/,/g, '')

// Application specific functions
const pluckAllNumbers = match(/([0-9]+,([0-9]+)?)|\d+\.\d+|\d+/g)
const stringToNumber = pipe(
  stripComma,
  Number
)
const mapConvertStringToNumber = map(stringToNumber)


readFile('Sagittarius.txt', 'utf8')
.then(data => {
  return pluckAllNumbers(data)
})
.then(data => {
  // console.log(data)
  return mapConvertStringToNumber(data)
})
.then(data => {
  console.log(`Maximum number: ${Math.max(...data)}`)
  return data
})
.then(data => {
  console.log(`Minimum number: ${Math.min(...data)}`)
  return data
})
.then(data => {
  console.log(`Sum of numbers: ${totalListOfNumbers(data)}`)
  return data
})
.then(data => {
  console.log(`Average of numbers: ${totalListOfNumbers(data) / data.length}`)
  return data
})
.then(data => {
  console.log(`Numbers > 1000: ${data.filter(x => x > 1000)}`)
  return data
})
.catch(err => {console.log(err.message)})
