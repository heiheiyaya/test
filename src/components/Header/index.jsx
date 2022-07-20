import React, { Component } from 'react'
import { Modal } from 'antd'
import { Navigate } from 'react-router-dom'

import { reqWether } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import './index.less'


export default class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        weather: '',

    }
    logout = () => {
        // 显示确认提示
        Modal.confirm({
            title: '确认退出吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                // 确定后, 删除存储的用户信息
                // local中的
                storageUtils.removeUser()
                // 内存中的
                memoryUtils.user = {}
                // 跳转到登陆界面
            },
            onCancel() {

            },
        })

    }
    getWeather = async () => {
        const { weather } = await reqWether('重庆')
        this.setState({
            weather
        })

    }
    getTitle = () => {
        let title = ''
        const path = window.location.pathname
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if (cItem) {
                    title = cItem.title
                }
            }

        })
        return title
    }

    componentDidMount() {
        // 启动循环定时器
        this.getWeather();
        this.intervalId = setInterval(() => {
            // 将currentTime更新为当前时间值
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000);


    }
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }
    render() {
        const user = memoryUtils.user
        // 得到当前需要显示的title
        const title = this.getTitle()
        // 退出后自动跳转到指定的登录页面
        const users = memoryUtils.user
        if (Object.keys(users).length === 0) {
            return <Navigate to='/' replace='true' />
        }

        return (
            <div className="header">
                <div className="header-top">
                    欢迎, {user.data.username} &nbsp;&nbsp;
                    <a onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>

                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
