import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import { Relogin } from '../../api'
import { message } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'


import logo from './images/logo.png'
import './login.less'


class Login extends Component {
    state = {
        user: null,
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { username, password } = values;
                const reponse = await Relogin(username, password)
                const user = reponse.data
                if (user.status === 0) {
                    message.success('登陆成功，欢迎' + user.data.username)
                    this.setState({ user: user.data.username })
                    storageUtils.saveUser(user)
                    // 保存到内存中
                    memoryUtils.user = user

                } else { // 登陆失败
                    message.error(user.msg)
                }
            } else {
                console.log('检验失败！')
            }
        });
    };
    validatePwd = (rule, value, callback) => {
        // 1).必须输入
        // 2).必须大于等于4位
        // 3).必须小于等于12位
        // 4).必须是英文、数字或下划线组成
        value = value.trim()
        if (!value) {
            callback('密码必须输入')
        } else if (value.length < 4) {
            callback('密码不能小于4位')
        } else if (value.length > 32) {
            callback('密码不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
        } else {
            callback() // 验证通过
        }
    }

    render() {

        const users = memoryUtils.user
        if (Object.keys(users).length !== 0) {
            return <Navigate to='/Admin' replace='true' /> // 自动跳转到指定的路由路径
        }


        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                {this.state.user && (
                    <Navigate to='/Admin' replace='true' />
                )}
                <div className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登陆</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, whitespace: true, message: '请输入用户名!' },
                                { min: 4, message: '用户名不能小于4位' },
                                { max: 12, message: '用户名不能大于12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    { validator: this.validatePwd }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>

                </div>

            </div>
        )
    }
}
const WrappedLogin = Form.create()(Login);
export default WrappedLogin;