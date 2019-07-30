/**
 * 数组去重
 */
function uniq (arr) {
  return [...new Set(arr)]
}
function uniq (array) {
  let temp = []
  let len = array.length
  for (let i = 0; i < len; i ++) {
    for (let j = i + 1; j < len; j++) {
      if (array[i] === array[j]) {
        i++
        j = i
      }
    }
    temp.push(array[i])
  }
  return temp
}

/**
 * 获取数组交集
 */
const similarity = (arr1, arr2) => arr1.filter(v => arr2.includes(v))

/**
 * 数组降维
 */
let arr = [1, [2, [3], 4], 5]
arr.flat(Infinity)
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))

/**
 * 过滤数组对象
 */
const data = [
  {
    id: 1,
    name: 'zhang',
    age: 25
  },
  {
    id: 2,
    name: 'wang',
    age: 26
  },
  {
    id: 3,
    name: 'li`',
    age: 24
  }
]
const reducedFilter = (data, keys, fn) => data.filter(fn).map(el => keys.reduce((acc, key) => { 
  acc[key] = el[key]
  return acc
}, {}))
reducedFilter(data, ['id', 'name'], item => item.age > 25)

/**
 * 数组对象去重
 */
let arr = [
  { id: 1, name: 'zhang' },
  { id: 2, name: 'wang' },
  { id: 3, name: 'li' }
]
const uniqueElementsBy = (arr, fn) => arr.reduce((acc, v) => {
  if (!acc.some(x => fn(v, x))) {
    acc.push(v)
  }
  return acc
}, [])
uniqueElementsBy(arr, (a, b) => a.id === b.id)

/**
 * 检查数组中某元素出现的次数
 */
function countOccurrences (arr, value) {
  return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
}
let arr = [1,1,1,2,3,4]
countOccurrences(arr, 1)

/**
 * new Date() 转为 yyyy-MM-dd hh:mm:ss
 */
function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/**
 * 深拷贝
 */
function deepClone (source) {
  // 判断复制的目标是数组还是对象
  const targetObj = source.constructor === Array ? [] : {}
  for (let keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/**
 * JS对象转url查询字符串
 */
const objectToQueryString = (obj) => {
  Object.keys(obj),map((key) => {
    `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
  }).join('&')
}

/**
 * 获取url中的参数
 */
function getUrlParameters (url) {
  const params = url.match(/([^?=&]+)(=([^&]*))/g)
  return params ? params.reduce((a, v) => {
    (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  }) : []
}

/**
 * 加减法精度缺少问题
 */
// 加法函数（因为JS小数计算 丢失精度）
function add(arg1, arg2) { 
  let r1, r2, m; 
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 } 
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 } 
  m = Math.pow(10, Math.max(r1, r2)) 
  return (arg1 * m + arg2 * m) / m 
}
// 减法函数（因为JS小数计算 丢失精度）
function sub(arg1, arg2) { 
  let r1, r2, m, n; 
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 } 
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 } 
  m = Math.pow(10, Math.max(r1, r2)); 
  n = (r1 >= r2) ? r1 : r2; 
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n)); 
}

// 复制
function copy () {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', `想复制的内容`)
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    this.$message.success('复制成功')
  }
  document.body.removeChild(input)
}

// 单行写评级
// "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)
var rate = 1
"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)
// "★☆☆☆☆"
var rate = 2
"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)
// "★★☆☆☆"

// 随机取字符串
Math.random().toString(16).substring(2) 
Math.random().toString(36).substring(2)

// 取整
var a = ~~2.33

var b= 2.33 | 0

var c= 2.33 >> 0

//优雅的实现金钱格式化：1234567890 --> 1,234,567,890
//正则
var test1 = '1234567890'
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

console.log(format) // 1,234,567,890
//非正则
function formatCash(str) {
  return str.split('').reverse().reduce((prev, next, index) => {
       return ((index % 3) ? next : (next + ',')) + prev
  })
}
console.log(formatCash('1234567890')) // 1,234,567,890