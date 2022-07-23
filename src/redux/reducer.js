/*函数*/
import { combineReducers } from 'redux'
import { SET_HEAD_TITLE, REQ_USER, LOG_USER } from './action-types'
import storageUtils from '../utils/storageUtils'

//管理头部标题的reducers函数
const initHeadTitle = '首页'
function headTitle(state = initHeadTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

//管理当前登录用户

const initUser = storageUtils.getUser()

function user(state = initUser, action) {
    switch (action.type) {
        case REQ_USER:
            return action.user
        case LOG_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})