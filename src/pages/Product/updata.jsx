import React, { Component } from 'react'
import {
    Card,
    Icon,
    Form,
    Input,
    Select,
    Button,
    message,
    Upload,
} from 'antd'

import { reqCategorys, reqAddUpdateProduct } from '../../api'
import { Link, Navigate } from 'react-router-dom'
import PicturesWall from './pictureWall'
import RichTextEditor from './rich-text-editor'

import memoryUtils from '../../utils/memoryUtils'


const Item = Form.Item
const Option = Select.Option

/*
商品添加/更新的路由组件
*/
class ProductaddUpdate extends Component {

    state = {
        categorys: []
    }
    constructor(props) {
        super(props);
        // 创建ref容器, 并保存到组件对象
        this.pwRef = React.createRef()
        this.editorRef = React.createRef()
    }



    getCategorys = async () => {
        const result = await reqCategorys()
        if (result.data.status === 0) {
            const categorys = result.data.data
            this.setState({ categorys })
        }
    }

    /* 
    对价格进行自定义验证
    */
    validatePrice = (rule, value, callback) => {
        if (value === '') {
            callback()
        } else if (value * 1 <= 0) {
            callback('价格必须大于0')
        } else {
            callback()
        }
    }

    /* 
     处理提交的回调
    */
    handleSubmit = (event) => {
        // 阻止事件的默认行为(提交表单)
        event.preventDefault()

        // 进行统一的表单验证
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { name, desc, price, categoryId } = values



                // 收集上传的图片文件名的数组
                const imgs = this.pwRef.current.getImgs()
                // console.log('imgs', imgs)
                // // 输入的商品详情的标签字符串
                const detail = this.editorRef.current.getDetail()
                // console.log('detail', detail)

                // 封装product对象
                const product = { name, desc, price, categoryId, imgs, detail }
                if (this.isUpdate) {
                    product._id = this.product._id
                }
                console.log(product._id)

                // 发请求添加或修改
                const result = await reqAddUpdateProduct(product)
                if (result.data.status === 0) {
                    message.success(`${this.isUpdate ? '修改' : '添加'}商品成功`)
                    return <Navigate to='/product' replace='true' />
                } else {
                    message.error(result.data.msg)
                }
            }
        })
    }

    componentWillMount() {
        this.product = memoryUtils.product || {}
        this.isUpdate = (!Object.getOwnPropertyNames(this.product).length == 0)

    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {
        const { categorys } = this.state
        const { isUpdate, product } = this



        const { getFieldDecorator } = this.props.form

        const title = (
            <span>
                <Link to={`/Admin/product/home`}>
                    <Icon type="arrow-left" />
                </Link>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )

        // 指定form中所有item的布局
        const formLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }

        return (
            <Card title={title}>
                <Form {...formLayout} onSubmit={this.handleSubmit}>
                    <Item label="商品名称">
                        {getFieldDecorator('name', {
                            initialValue: product.name,
                            rules: [
                                { required: true, message: '必须输入商品名称!' }
                            ],
                        })(<Input placeholder="商品名称" />)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                            initialValue: product.desc,
                            rules: [
                                { required: true, message: '必须输入商品描述!' }
                            ],
                        })(<Input placeholder="商品描述" />)}
                    </Item>
                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [
                                { required: true, message: '必须输入价格!' },
                                { validator: this.validatePrice }
                            ],
                        })(<Input type="number" placeholder="商品价格" addonAfter="元" />)}
                    </Item>
                    <Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                            initialValue: product.categoryId || '',
                            rules: [
                                { required: true, message: '必须输入商品分类!' }
                            ],
                        })(
                            <Select>
                                <Option value=''>未选择</Option>
                                {
                                    categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                                }
                            </Select>
                        )}
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall ref={this.pwRef} imgs={product.imgs} />
                    </Item>
                    <Item label="商品详情" wrapperCol={{ span: 20 }}>
                        <RichTextEditor ref={this.editorRef} detail={product.detail} />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductaddUpdate)

