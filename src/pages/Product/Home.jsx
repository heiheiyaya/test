import React, { Component } from 'react'
import {
    Select,
    Card,
    Table,
    Input,
    Button,
    Icon,
    message,



} from 'antd'

import { PAGE_SIZE } from '../../utils/constant'
import { reqProducts } from '../../api'
import { reqSearchProducts, reqUpdateStatus } from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import { Link } from 'react-router-dom'
const { Option } = Select;

export default class Home extends Component {
    state = {
        loading: false,
        products: [], // 商品列表
        total: 0, // 商品的总数量
        searchType: 'productName', // 默认是按商品名称搜索
        searchName: '', // 搜索的关键字
    }

    getProducts = async (pageNum) => {
        // 保存当前请求的页码
        this.pageNum = pageNum
        const { searchName, searchType } = this.state
        let result
        // 发请求获取数据
        if (!this.isSearch) {
            result = await reqProducts(pageNum, PAGE_SIZE)
        } else {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        }

        if (result.data.status === 0) {
            // 取出数据
            const { total, list } = result.data.data
            // 更新状态
            this.setState({
                products: list,
                total
            })
        }
    }

    updataStatus = async (_id, status) => {
        const res = await reqUpdateStatus(_id, status)
        if (res.data.status === 0) {
            message.success('更新商品成功')
            this.getProducts(this.pageNum)

        }

    }

    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                width: 100,
                dataIndex: 'price',
                render: (price) => '¥' + price
            },
            {
                title: '状态',
                width: 100,
                // dataIndex: 'status',
                render: (product) => {
                    const { _id, status } = product

                    return (
                        <span>
                            <Button type="primary" onClick={() => {
                                this.updataStatus(_id, status === 1 ? 2 : 1)
                            }}
                            >{status === 1 ? '下架' : '上架'}
                            </Button><br />
                            <span>{status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },

            {
                title: '操作',
                width: 100,
                render: (product) => (
                    <span>

                        <Link to={`/Admin/product/detail/${product._id}`}>
                            <Button onClick={() => {
                                // 在内存中保存product
                                memoryUtils.product = product
                            }} >
                                详情
                            </Button>
                        </Link>
                        <Link to={`/Admin/product/addupdata`}>
                            <Button
                                onClick={() => {
                                    // 在内存中保存product
                                    memoryUtils.product = product
                                }}>
                                修改
                            </Button>
                        </Link>
                    </span>
                )
            },]
    }

    componentWillMount() {
        this.initColumns()
        memoryUtils.product = {}
    }
    componentDidMount() {
        // 获取第一页显示
        this.getProducts(1)
    }

    render() {
        const { loading, products, total, searchType, searchName } = this.state

        const title = (
            <span>
                <Select
                    style={{ width: 200 }}
                    value={searchType}
                    onChange={(value) => this.setState({ searchType: value })}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input
                    style={{ width: 200, margin: '0 10px' }}
                    placeholder="关键字"
                    value={searchName}
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button type="primary" onClick={() => {
                    this.isSearch = true  // 保存搜索的标记
                    this.getProducts(1)
                }}
                >搜索</Button>
            </span>
        )
        const extra = (
            <Link to={`/Admin/product/addupdata`}>
                <Button type="primary">
                    <Icon type="plus" />
                    添加商品
                </Button>
            </Link>

        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    rowKey="_id"
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts,
                        current: this.pageNum
                    }}

                />
            </Card>
        )
    }
}
