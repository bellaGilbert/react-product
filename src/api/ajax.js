/*
封装axios
  1. 统一处理请求异常
  2. 异步请求成功的数据不是response, 而是response.data
*/

import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  const {method, data} = config
  // 如果是携带数据的post请求, 进行处理
  if (method.toLowerCase()==='post' && data && typeof data==='object') {
    config.data = qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
  }

  return config
})


// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  // 返回response中的data数据, 这样请求成功的数据就是data了
  return response.data
}, error => {// 请求异常
  // 提示错误
  message.error('请求异常, status: ' + error.code)
  // 返回一个pending的promise, 中断promise链
  return new Promise(() => {})
})

export default axios
