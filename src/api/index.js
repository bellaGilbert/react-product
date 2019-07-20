/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) => ajax.post(BASE + '/login', {username, password})

// 获取分类的列表
export const reqCategorys = () => ajax(BASE + '/manage/category/list')

// 添加分类
export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add', {categoryName})

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update', {categoryId, categoryName})

// 获取一个分类
export const reqCategory = (categoryId) => ajax.get(BASE + '/manage/category/info', {
  params: {
    categoryId
  }
})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax.get(BASE + '/manage/product/list', {
  params: {
    pageNum,
    pageSize
  }
})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax.post(BASE + '/manage/product/updateStatus', {productId, status})



/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax.get(BASE + '/manage/product/search', {
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName,
  }
})

// 搜索商品分页列表 (根据商品描述)
/*export const reqSearchProducts2 = ({pageNum, pageSize, searchName}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  productDesc: searchName,
})*/

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax.post(BASE + '/manage/img/delete', {name})

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax.post(BASE + '/manage/product/' + ( product._id?'update':'add'), product)

// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax.post(BASE + '/manage/role/add', {roleName})
// 添加角色
export const reqUpdateRole = (role) => ajax.post(BASE + '/manage/role/update', role)


// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax.post(BASE + '/manage/user/delete', {userId})
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax.post(BASE + '/manage/user/'+(user._id ? 'update' : 'add'), user)

/*
json请求的接口请求函数
 */
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log('jsonp()', err, data)
      // 如果成功了
      if (!err && data.status==='success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }

    })
  })
}
// reqWeather('北京')
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */