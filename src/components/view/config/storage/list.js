import React from 'react'
import { Table, Divider, Tag, Input, Checkbox, Button, message, Modal } from 'antd'

import WrappedForm from './../../../common/form.js'

import api from './../../../../api.js'
import {axiosProxy} from './../../../../tool.js'

export default class ModelList extends React.Component {
	constructor(props) {
  		super(props);

  		this.state = {
  			formType: '',
  			visible: false,

  			currentTableRow: {},
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
		this.setState({
			visible: true,
			formType: 'detail',
			currentTableRow: record
		})
	}

	toEdit (record, index) {
		this.setState({
			visible: true,
			formType: 'edit',
			currentTableRow: record
		})
	}

	getStorageList () {
		axiosProxy.get(api.storageList).then( res => {
			if(res.data.errorCode === 0) {
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
					message.error(res.data.errorMessage)
				} else {
					message.error('操作失败')
				}
			}
		}).catch( error => {
			console.log(error)
		})
	}

	handleOk () {
		this.setState({
			visible: false
		})
	}

	handleCancel () {
		this.setState({
			visible: false
		})
	}

	formCallback (value, type) {
		if(type === 'reset') {
			console.log('这是点了重置按钮')
		} else if(type === 'edit') {
			console.log('这是返回了表单内容')
			this.updateStorage(value)
		} else if (type === 'oss') {
			console.log('这是更新oss详情配置')
		} else if (type === 'ftp') {
			console.log('这是更新ftp详情配置')
		}
		this.setState({
			visible: false
		})
	}

	updateStorage (obj) {
		axiosProxy.put(api.storageUpdate, obj).then( res => {
			if (res.data.errorCode === 0) {
				message.success('操作成功')
				setTimeout (() => {
					this.getStorageList()
				}, 500)
			} else {
				if(res.data.errorMessage) {
					message.error(res.data.errorMessage)
				} else {
					message.error('操作失败')
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
		        <Modal
		        	footer={null}
	                title="编辑配置"
	                onCancel={this.handleCancel.bind(this)}
	                destroyOnClose={true}
	                visible={this.state.visible}
	                width={800}>

	                <WrappedForm type={this.state.formType} element={this.state.currentTableRow} callback={this.formCallback.bind(this)} />
	            </Modal>
	        </div>
		)
  	}
}