import React from 'react'
import { Table, Checkbox, Input, Button, message } from 'antd'

import api from './../../../../api.js'
import {axiosProxy} from './../../../../tool.js'

export default class ModelList extends React.Component {
	constructor(props) {
  		super(props);

  		this.state = {
  			buttonEnable: false,
		    selectedRowKeys: [], 
		    data: [],
		    columns: [{
			  	title: 'ID',
			  	dataIndex: 'id',
			  	align: 'center'
			}, {
			  	title: '模型名称',
			  	dataIndex: 'name',
			  	align: 'center'
			}, {
			  	title: '展示名字',
			  	dataIndex: 'showName',
			  	align: 'center'
			}, {
				title: '排列顺序',
				dataIndex: 'priority',
				align: 'center',
				width: 100,
				render: (text, record, index) => <Input value={text} onChange={ this.getPriority.bind(this, index) }/>
			}, {
				title: '可用',
				dataIndex: 'enable',
				align: 'center',
				render: (text, record, index) => <Checkbox checked={text} onChange={ this.changeCheck.bind(this, text, index)}></Checkbox>
				
			}, {
				title: '内容模型操作',
				align: 'center',
				dataIndex: '',
				render: (text, record, index) => {
					let url = '/config/model/items?id=' + text.id + '&name=' + text.showName
					return <a href={url} style={{ color: '#4184b7'}}>[内容模型]</a> 
				}
			}, {
				title: '操作',
				align: 'center',
				dataIndex: 'action',
				render: () => <a href="javascript:;">编辑</a>
			}]
		}
  	}

	start = () => {
	    setTimeout(() => {
	        this.setState({
	        	selectedRowKeys: []
	        })
	    }, 1000)
	}

	what () {
		console.log('what')
	}

	getPriority (index, value) {
		this.state.data[index].priority = value.target.value
		this.setState({
			data: this.state.data
		})
	}

	changeCheck(value, index) {
  		console.log(value, index)
  		this.state.data[index].enable = !value
  		this.setState({
  			data: this.state.data
  		})
  	}

	getModelList = () => {
		axiosProxy.get(api.modelList).then( res=> {
			if(res.data.errorCode === 0) {
				console.log('拿到的模型列表')
				console.log(res)
				console.log('找到那个绑在表格上的data')
				this.state.data = res.data.data
				for (let i in this.state.data) {
					this.state.data[i].key = i
				}
				this.setState({
					data: this.state.data
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

	ChangeChecked = (value, index) => {
		console.log('切换点击状态时候')
		console.log(value)
		console.log(index)
	}

	onSelectChange = (selectedRowKeys, selectedRows) => {
	    console.log('selectedRowKeys changed: ', selectedRowKeys)
	    this.setState({ selectedRowKeys })
	    console.log('拿到的选中项')
	    console.log(selectedRows)
	    if(selectedRows.length > 0) {
	    	this.state.buttonEnable = true
	    } else {
	    	this.state.buttonEnable = false
	    }
	    this.setState({
	    	buttonEnable: this.state.buttonEnable
	    })
	}

	saveModelList () {
		console.log('点击了保存内容')
	}

	componentDidMount () {
    	this.getModelList()
	}

	render() {
	    const { selectedRowKeys } = this.state
	    const rowSelection = {
	      selectedRowKeys,
	      onChange: this.onSelectChange,
	    }
	    const hasSelected = selectedRowKeys.length > 0
	    let buttonSave
	    if(this.state.buttonEnable === true) {
	    	buttonSave = <Button onClick={this.saveModelList.bind(this)}>保存内容</Button>
	    } else {
	    	buttonSave = <Button disabled>保存内容</Button>
	    }
	    return (
	      	<div>
		        <div style={{ marginBottom: 16 }}>
		          	<span style={{ marginLeft: 8 }}>
		            	{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
		          	</span>
		        </div>
		        <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} pagination={false} />
		        <div style={{ paddingTop: '20px', paddingBottom: '20px'}}>
		        	{buttonSave}
		        </div>
	        </div>
		)
  	}
}