import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Admin from './pages/Admin'

export default class App extends Component {
	render() {
		return (
			<Routes>
				<Route path="/" element={<Login />}></Route>
				<Route path="/Admin" element={<Admin />}></Route>
			</Routes>
		)
	}
}
