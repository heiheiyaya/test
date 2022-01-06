import ajax from './ajax'

const BASE = ''

export const Relogin = (username, password) => ajax(BASE + '/login', { username, password }, 'post')
//获取分类
export const reqCategorys = () => ajax(BASE + '/manage/category/list')

// 添加分类
export const reqAddCategory = (categoryName, post = 'post') => ajax(BASE + '/manage/category/add', {
    categoryName
}, post)

// 修改分类
export const reqUpdateCategory = ({ categoryId, categoryName }, post = 'post') => ajax(BASE + '/manage/category/update', {
    categoryId,
    categoryName
}, post)
