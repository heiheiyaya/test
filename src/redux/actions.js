import { message } from 'antd'
import {
    SET_HEAD_TITLE,
    REQ_USER,
    LOG_USER


} from './action-types'
import { Relogin } from '../api'
import storageUtils from '../utils/storageUtils'



export const setHeadTitle = (headTitle) => ({
    type: SET_HEAD_TITLE,
    data: headTitle
})
export const reqUser = (user) => ({
    type: REQ_USER,
    user
})
export const logUser = () => {
    storageUtils.removeUser()
    return { type: LOG_USER }

}


export const login = (username, password) => {
    return async dispatch => {
        const result = await Relogin(username, password)
        console.log(result)
        if (result.data.status === 0) {
            const user = result.data.data
            storageUtils.saveUser(user)
            dispatch(reqUser(user))
        } else {
            message.error(result.msg)
        }
    }
}


