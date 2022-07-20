import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'


const BASE = ''

export const Relogin = (username, password) => ajax(BASE + '/login', { username, password }, 'post')
//获取分类
export const reqCategorys = () => ajax(BASE + '/manage/category/list')
export function reqWether(city) {
    return new Promise((resolve, reject) => {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&output=JSON&key=62487deb8f2ead0067fc9b1a3b68872e`
        jsonp(url, {}, (error, response) => {
            if (!error && response.status === '1') {
                const { weather } = response.lives[0];
                resolve({ weather });
            } else {
                message.error("无法获取天气")
            }
        })
    })

}

// 添加分类
export const reqAddCategory = (categoryName, post = 'post') => ajax(BASE + '/manage/category/add', {
    categoryName
}, post)

// 修改分类
export const reqUpdateCategory = ({ categoryId, categoryName }, post = 'post') => ajax(BASE + '/manage/category/update', {
    categoryId,
    categoryName
}, post)
//商品分类管理 接口
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize })

/* 根据Name/desc搜索产品分页列表 */
export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchName,
    searchType // 它的值是'productName'或者'productDesc'
}) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,

})

/* 根据商品ID获取商品 */
export const reqProduct = (productId) => ajax(BASE + '/manage/product/info', { productId })
// 根据分类id获取分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId })
/* 添加/修改商品 */
export const reqAddUpdateProduct = (product) => ajax(
    BASE + '/manage/product/' + (product._id ? 'update' : 'add'),
    product, 'post'
)

export const reqUpdateStatus = (productId, status) => ajax(
    BASE + '/manage/product/updateStatus',
    { productId, status },
    'post')
export const reqDeleteImg = (name) => ajax.post(BASE + '/manage/img/delete', { name })

export const reqRoles = () => ajax(BASE + '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', {
    roleName
}, 'post')
// 更新角色
export const reqUpdateRole = (role) => ajax(BASE + '/manage/role/update', role, 'post')


// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', {
    userId
}, 'post')
// 添加/更新用户

export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'post')

