import React, { Component } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from 'antd';

import Home from '../Home'
import Categroy from '../Category'
import Chart from '../Chart'
import Product from '../Product'
import User from '../User'
import Role from '../Role'

import Header from '../../components/Header'
import LeftNav from '../../components/LeftNav'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        return (
            <Layout style={{ height: '100%' }}>
                <Sider><LeftNav /></Sider>
                <Layout>
                    <Header />
                    <Content style={{ background: 'white', margin: '20px' }}>
                        <Routes>
                            <Route path="/home" element={<Home />}></Route>
                            <Route path="/user" element={<User />}></Route>
                            <Route path="/role" element={<Role />}></Route>
                            <Route path="/product" element={<Product />}></Route>
                            <Route path="/chart" element={<Chart />}></Route>
                            <Route path="/category" element={<Categroy />}></Route>
                            <Route path="/*" element={<Navigate to="/Admin/home" />} />

                        </Routes>

                    </Content>
                    <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)' }}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>

        )
    }
}
