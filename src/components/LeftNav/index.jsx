import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import logo from '../../pages/Login/images/logo.png'
import './index.less'
// import memoryUtils from '../../utils/memoryUtils';
import menuList from '../../config/menuConfig'
//redux
import { connect } from 'react-redux'
import { setHeadTitle } from '../../redux/actions'


const { SubMenu } = Menu;
class LeftNav extends Component {
    state = {
        collapsed: false,
    };

    hasAuth = (item) => {

        const key = item.key
        const menuSet = this.menuSet
        /*
        1. 如果菜单项标识为公开
        2. 如果当前用户是admin
        3. 如果菜单项的key在用户的menus中
         */
        console.log()
        if (item.Public || this.props.user.username === 'admin' || menuSet.has(key)) {
            return true
            // 4. 如果有子节点, 需要判断有没有一个child的key在menus中
        } else if (item.children) {
            return !!item.children.find(child => menuSet.has(child.key))
        }
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    getMenuNodes2 = (list) => {

        // 得到当前请求的path
        const path = window.location.pathname

        return list.reduce((pre, item) => {

            if (this.hasAuth(item)) {
                if (!item.children) {
                    if (item.key === path || path.indexOf(item.key) === 0) {
                        this.props.setHeadTitle(item.title)
                    }

                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key} onClick={() => { this.props.setHeadTitle(item.title) }}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {
                    pre.push((
                        <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                            {
                                this.getMenuNodes(item.children)
                            }
                        </SubMenu>
                    ))

                    if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
                        this.openKey = item.key
                    }
                }
            }
            return pre
        }, [])

    }
    getMenuNodes = (menuList) => {

        const path = window.location.pathname
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key} onClick={() => { this.props.setHeadTitle(item.title) }}>
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
        this.menuSet = new Set(this.props.user.role.menus || [])
        this.menuNodes = this.getMenuNodes2(menuList)
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
        if (selectKey.indexOf('/product') === 0) {
            selectKey = '/product'
        }


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

export default connect(
    state => ({ user: state.user }),
    { setHeadTitle }
)(LeftNav)
