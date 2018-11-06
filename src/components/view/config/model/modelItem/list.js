import React from 'react'
import { Table, Button, Checkbox, Input, message } from 'antd'

import api from './../../../../../api.js'
import {axiosProxy, getUrlParams} from './../../../../../tool.js'

export default class ModelItems extends React.Component {
	constructor(props) {
  		super(props)
  		this.state = {
  			buttonEnable: false,
		    selectedRowKeys: [], 
		    loading: false,
		    data: [],
		    modelId: null,
		    modelName: '呵呵',
		    columns: [{
			  	title: 'ID',
			  	dataIndex: 'id',
			  	align: 'center'
			}, {
			  	title: '字段',
			  	dataIndex: 'field',
			  	align: 'center',
			  	render: (text, record, index) => {
			  		if(record.change === false) {
			  			return <span style={{ color: '#f00' }}>{record.field}</span>
			  		} else {
			  			return <span>{record.field}</span>
			  		}
			  	}
			}, {
			  	title: '数据类型',
			  	dataIndex: 'dataTypeName',
			  	align: 'center'
			}, {
				title: '名称',
				dataIndex: 'showName'
			}, {
				title: '排列顺序',
				dataIndex: 'priority',
				align: 'center',
				width: 100,
				render: (row, column, index) => <Input value={row} onChange={ this.getPriority.bind(this, index)}/>
			}, {
				title: '独占一行',
				dataIndex: 'single',
				align: 'center',
				render: (text, record, index) => <Checkbox checked={text} onChange={ this.changeCheck.bind(this, text, index)}></Checkbox>
				
			}, {
				title: '操作',
				align: 'center',
				dataIndex: 'action',
				render: (text, record, index) => {
					if(record.change === false) {
						return null
					} else {
						return <a href="javascript: void(0);" onClick={this.toEdit.bind(this, record, index)}>编辑</a>
					}
				}
			}]
		}
  	}

  	toEdit (record, index) {
  		console.log('去编辑页面')
  		console.log(arguments)
  	}

  	changeCheck(value, index) {
  		console.log(value, index)
  		this.state.data[index].single = !value
  		this.setState({
  			data: this.state.data
  		})
  	}

	getPriority (index, value) {
		this.state.data[index].priority = value.target.value
		this.setState({
			data: this.state.data
		})
	}

	componentDidMount () {
    	let modelId = getUrlParams('id')
    	let modelName = getUrlParams('name')
    	this.setState ({
    		modelId: modelId,
    		modelName: modelName
    	})
    	this.getItemsList(modelId)
	}

	getItemsList (modelId) {
		axiosProxy.get(api.modelItemsList + '/' + modelId).then( res => {
			if( res.data.errorCode === 0) {
				this.state.data = res.data.data
				for (let i in this.state.data) {
					this.state.data[i].key = i
					switch (this.state.data[i].dataType) {
						case 1:
							this.state.data[i].dataTypeName = '字符串文本'
						break
						case 2:
							this.state.data[i].dataTypeName = '整形字符串'
						break
						case 3:
							this.state.data[i].dataTypeName = '浮点类型字符串'
						break
						case 4:
							this.state.data[i].dataTypeName = '多行文本'
						break
						case 5:
							this.state.data[i].dataTypeName = '日期'
						break
						case 6:
							this.state.data[i].dataTypeName = '下拉选框'
						break
						case 7:
							this.state.data[i].dataTypeName = '多选框'
						break
						case 8:
							this.state.data[i].dataTypeName = '单选框'
						break
						case 10:
							this.state.data[i].dataTypeName = '图片'
						break
						case 11:
							this.state.data[i].dataTypeName = '富文本编辑器'
						break
						default:
							this.state.data[i].dataTypeName = '其他类型'
					}
				}
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

	toNew () {
		console.log('新加模型项去')
	}

	saveModelList () {
		console.log('点击了保存内容')
	}

	render() {
	    const { loading, selectedRowKeys } = this.state

	    const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
			    if(selectedRows.length > 0) {
			    	this.state.buttonEnable = true
			    } else {
			    	this.state.buttonEnable = false
			    }
			    this.setState({
			    	buttonEnable: this.state.buttonEnable
			    })
			},
			getCheckboxProps: record => ({
			    disabled: record.name === 'Disabled User', 
			    name: record.name,
			}),
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
		          	<span>当前内容模型: </span>
		          	<span style={{color: '#4184b7'}}>{this.state.modelName}</span>
		          	&nbsp;&nbsp;
		          	<Button type="primary" onClick={this.toNew.bind(this)}>添加</Button>
		        </div>
		        <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} pagination={false} />
		        <div style={{ paddingTop: '20px', paddingBottom: '20px'}}>
		        	{buttonSave}
		        </div>
	        </div>
		)
  	}
}
