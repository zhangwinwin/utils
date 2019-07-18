import axios from 'axios' // 引入axios
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据

let isDev = process.env.NODE_ENV
let baseURL = ''
// 环境的切换
if (idDev === 'development') {
  baseURL = 'http://development.com'
} else {
  baseURL = 'http://production.com'
}

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  auth: {
    username: 'zhang',
    password: 'zhang'
  }
})

// 请求拦截器
axios.interceptors.request.use(
  config => {
     // ...
    return config
  },
  error => {
    return Promise.error(error)
  }
)

const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 响应拦截器
axios.interceptors.response.use(
  response => {
    let status = response.status
    if (status === 200) {
      return Promise.resolve(response)
    } else {
      Toast('服务器错误')
      return Promise.reject(response)
    }
  },
  error => {
    let status = error.response.status
    switch (status) {
      case 401:
        toLogin()
        break
      case 403:
        Toast('登录过期， 请重新登录')
        setTimeout(() => {
          toLogin()
        })
        break
      case 404:
        Toast('网络请求不存在')
        break
      default: 
        Toast(error.response.data.message)
    }
    return Promise.reject(error.response)
  }
)

export default instance