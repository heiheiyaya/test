import React, { Component } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './Home'
import Productaddupdata from './updata'
import ProductDetail from './Detail'
import './product.less'


export default class Product extends Component {
    render() {
        return (
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/addupdata" element={<Productaddupdata />}></Route>
                <Route path="/detail" element={<ProductDetail />}>
                    <Route path=":id" element={<ProductDetail />} />
                </Route>
                <Route path="/*" element={<Navigate to="/Admin/product/home" />} />
            </Routes>
        )
    }
}
