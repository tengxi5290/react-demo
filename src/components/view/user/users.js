import React from 'react'
import {Layout, Table, Button, Icon, Dialog, Message} from 'element-react'
import api from './../../../api.js'
import {axiosProxy} from './../../../tool.js'

import Page from './../../common/pagination.js'

export default class Users extends React.Component {
	constructor(props) {
  		super(props);

  		this.table = {
		    columns: [
			    {
			        label: "日期",
			        prop: "date",
			        width: 150
			    },
			    {
			        label: "姓名",
			        prop: "name",
			        width: 100
			    },
			    {
			        label: "地址",
			        prop: "address"
			    }
		    ],
		    data: [{
		      	date: '2016-05-02',
		      	name: '王小虎',
		      	address: '上海市普陀区金沙江路 1518 弄'
		    }, {
		      	date: '2016-05-04',
		      	name: '王小虎',
		      	address: '上海市普陀区金沙江路 1517 弄'
		    }, {
		      	date: '2016-05-01',
		      	name: '王小虎',
		      	address: '上海市普陀区金沙江路 1519 弄'
		    }, {
		      	date: '2016-05-03',
		      	name: '王小虎',
		      	address: '上海市普陀区金沙江路 1516 弄'
		    }]
		}

		this.state = {
			dialogVisible: false,
			dialogType: null,
			dialogTitle: '',

		    columns: [
			    {
			        type: 'selection'
			    },
			    {
			    	label: 'ID',
			    	prop: 'id'
			    },
			    {
			    	label: '用户名',
			    	prop: 'userName'
			    },
			    {
			    	label: '手机号码',
			    	prop: 'mobileNumber'
			    },
			    {
			    	label: '状态',
			    	prop: 'ableStatus'
			    },
			    {
			    	label: '操作',
			    	render: (row, column, index) => {
			    		return (
				            <span>
					            <Button type="warning" size="small" onClick={this.showRoleList.bind(this, index)}><Icon name="star-on"/></Button>
					            <Button type="info" size="small" onClick={this.showSiteList.bind(this, index)}><Icon name="menu" /></Button>
				            </span>
				        )
			    	}
			    }
		    ],
		    data: [],
		    currentPage: 1,
		    total: null,
		    pageSize: 10,
		    showPagination: true
		}

		// this.getUserList = this.getUserList.bind(this)
	}

	showRoleList (index) {
		this.setState ({
			dialogType: 'role',
			dialogVisible: true,
			dialogTitle: '角色分配'
		})
	}

	showSiteList (index) {
		this.setState ({
			dialogType: 'site',
			dialogVisible: true,
			dialogTitle: '站点分配'
		})
	}

    getUserList (enable, page, pageSize) {
    	this.setState ({
    		showPagination: false
    	})
    	axiosProxy.get(api.userList + '?enable=' + enable + '&page=' + page + '&pageSize=' + pageSize).then(res => {
    		if(res.data.errorCode === 0) {
    			let datas = res.data.data.list
	    		let total = res.data.data.total
	    		for (let i in datas) {
	    			if(datas[i].enable === true) {
	    				datas[i].ableStatus = '启用'
	    			} else {
	    				datas[i].ableStatus = '禁用'
	    			}
	    		}
	    		this.setState ({
	    			data: datas,
	    			total: total,
	    			showPagination: true,
	    		})
    		} else {
    			if(res.data.errorMessage) {
    				Message({
    					message: res.data.errorMessage,
    					type: 'error'
    				})
    			} else {
    				Message({
    					message: '操作失败',
    					type: 'error'
    				})
    			}
    		}
    	}).catch (error => {
    		console.log(error)
    	})
    }

    componentDidMount () {
		this.getUserList(1, 1, 10)
	}

	currentChange (node) {
		let pageCount = this.state.pageSize
		let presentPage = this.state.currentPage
		if(arguments[1] === 'size') {
			pageCount = arguments[0]
			presentPage = 1
			this.getUserList(1, presentPage, pageCount)
		} else if (arguments[1] === 'current') {
			presentPage = arguments[0]
			this.getUserList(1, presentPage, pageCount)
		}
		this.showPagination = false
		this.setState({
			showPagination: true,
			pageSize: pageCount,
			currentPage: presentPage
		})
	}

	render(show) {
		if(this.state.showPagination === true) {
			return (
		    	<div>
				    <Table
				        columns={this.state.columns}
				        data={this.state.data}
				        border={true}
				        onSelectChange={(selection) => { console.log(selection) }}
				        onSelectAll={(selection) => { console.log(selection) }}
				    />
				    <Layout.Row>
				    	<Page total={this.state.total} currentPage={this.state.currentPage} callback={this.currentChange.bind(this)}/>
				    </Layout.Row>

				    <Dialog
				        title={ this.state.dialogTitle }
				        visible={ this.state.dialogVisible }
				        onCancel={ () => this.setState({ dialogVisible: false }) }
				    >
				        <Dialog.Body>
				          	{this.state.dialogVisible && (
				            	<Table
				             		style={{width: '100%'}}
				             		stripe={true}
				             		columns={this.table.columns}
				             		data={this.table.data} 
				             	/>
				          	)}
				        </Dialog.Body>
				    </Dialog>
		    	</div>
		    )
		} else {
			return null
		}
	}
}
