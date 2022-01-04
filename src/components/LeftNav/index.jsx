import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import logo from '../../pages/Login/images/logo.png'
import './index.less'

import menuList from '../../config/menuConfig'


const { SubMenu } = Menu;
export default class LeftNav extends Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    getMenuNodes = (menuList) => {

        const path = window.location.pathname
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
                if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
                    this.openKey = item.key
                }

                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    };
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        // 获取当前路径名，或者使用useLocation钩子
        // import { useLocation } from 'react-router-dom';

        // const App = () => {
        //     const location = useLocation();
        //     console.log(location.pathname)
        //     //...
        // };
        let selectKey = window.location.pathname;


        return (
            <div className='left-nav'>
                <Link className="left-nav-link" to="/">
                    <img src={logo} alt="logo" />
                    <h1>管理后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >

                    {this.menuNodes}

                </Menu>

            </div>
        )
    }
}
