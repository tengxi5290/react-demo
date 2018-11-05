import React from 'react'
import { Table, Divider, Tag, Input, Checkbox, Button } from 'antd'

import api from './../../../../api.js'
import {axiosProxy} from './../../../../tool.js'

export default class ModelList extends React.Component {
	constructor(props) {
  		super(props);

  		this.state = {
		    data: [],
		    columns: [{
			  	title: '名称',
			  	dataIndex: 'name',
			  	align: 'center'
			}, {
			  	title: '路径',
			  	dataIndex: 'rootPath',
			  	align: 'center'
			}, {
			  	title: '可用',
			  	dataIndex: 'enable',
			  	align: 'center',
			  	render: (text, record, index) => <Checkbox checked={text} onChange={ this.toggleEnable.bind(this, text, index)}></Checkbox>
			}, {
				title: '默认配置',
				dataIndex: 'isDefault',
				align: 'center',
				width: 100,
				render: (text, record, index) => <Checkbox checked={text} onChange={ this.toggleDefault.bind(this, text, index)}></Checkbox>
			}, {
				title: '存储平台',
				dataIndex: 'platform',
				align: 'center',
				
			}, {
				title: '详情配置',
				align: 'center',
				dataIndex: '',
				render: (text, record, index) => <Button type="primary" shape="circle" icon="read" onClick={ this.toDetail.bind(this, record, index) } />
			}, {
				title: '编辑',
				align: 'center',
				dataIndex: 'action',
				render: (text, record, index) => <Button type="primary" shape="circle" icon="edit" onClick={ this.toEdit.bind(this, record, index) } />
			}]
		}
  	}

	componentDidMount () {
    	this.getStorageList()
	}

	toggleEnable (value, index) {
		console.log(value)
		console.log(index)
		this.state.data[index].enable = !value
		this.setState({
			data: this.state.data
		})
	}

	toggleDefault (value, index) {
		this.state.data[index].isDefault = !value
		this.setState({
			data: this.state.data
		})
	}

	toDetail (record, index) {
		console.log('这里是点击详情按钮')
		console.log(record)
		console.log(index)
	}

	toEdit (record, index) {
		console.log('这里是点击编辑的按钮')
		console.log(record)
		console.log(index)
	}

	getStorageList () {
		axiosProxy.get(api.storageList).then( res => {
			if(res.data.errorCode === 0) {
				console.log('这是拿到的存储列表')
				console.log(res)
				let datas = res.data.data
				for (let i in datas) {
					datas[i].key = i
					if (datas[i].plat === 0) {
						datas[i].platform = 'FTP'
					} else if (datas[i].plat === 1) {
						datas[i].platform = 'OSS'
					}
				}
				this.setState ({
					data: datas
				})
			} else {
				if(res.data.errorMessage) {
					console.log('这里提示默认的错误信息')
				} else {
					console.log('这里提示自定义的错误信息')
				}
			}
		}).catch( error => {
			console.log(error)
		})
	}

	render() {
	    return (
	      	<div>
		        <Table columns={this.state.columns} dataSource={this.state.data} pagination={false} />
	        </div>
		)
  	}
}