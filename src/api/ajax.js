import axios from "axios"
import qs from 'qs'
import { message } from 'antd'


export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios({
                url: url,
                method: type,
                transformRequest: [function (data) {
                    // 对 data 进行任意转换处理
                    return qs.stringify(data)
                }],
                headers: {
                    'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                },
                data: data
            })
        }
        promise.then(reponse => {
            resolve(reponse)
        }).catch(error => {
            message.error('请求出错' + error.message)

        })

    })

}
