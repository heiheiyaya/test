import ajax from './ajax'

const BASE = ''

export const Relogin = (username, password) => ajax(BASE + '/login', { username, password }, 'post')
