import React from 'react'
import {Layout, Table, Button, Icon, Input} from 'element-react'
import api from './../../../api.js'
import {axiosProxy, timestampToTime} from './../../../tool.js'

import Page from './../../common/pagination.js'
import ChannelTree from './../../common/channelTree.js'

import './../../../commonStyle/common.css'

export default class ContentList extends React.Component {
	constructor(props) {
  		super(props);

		this.state = {
		    columns: [
			    {
			        type: 'selection',
			        align: 'center',
			    },
			    {
			    	label: 'ID',
			    	align: 'center',
			    	prop: 'id'
			    },
			    {
			    	label: '标题',
			    	prop: 'title',
			    	align: 'center',
			    	width: 300,
			    	render: (row, column, index) => {
			    		if(row.topLevel === true) {
			    			return (
				    			<div>
									<span className="top-text">[顶]</span>
				    				<span>{ row.title}</span>			    				
				    			</div>
				    		)
			    		} else {
			    			return (
				    			<div>
				    				<span>{ row.title}</span>			    				
				    			</div>
				    		)
			    		}
			    	}
			    },
			    {
			    	label: '权重',
			    	align: 'center',
			    	prop: 'weight',
			    	width: 90,
			    	render: (row, column, index) => {
			    		return (
			    			<Input value={row.weight} onChange={this.getWeight.bind(this, index)} />
			    		)
			    	}
			    },
			    {
			    	label: '类型',
			    	align: 'center',
			    	width: 110,
			    	prop: 'modelShowName',
			    },
			    {
			    	label: '发布者',
			    	align: 'center',
			    	prop: 'lastModifyUserName'
			    },
			    {
			    	label: '创建时间',
			    	align: 'center',
			    	width: 170,
			    	prop: 'createTime'
			    },
			    {
			    	label: '发布时间',
			    	align: 'center',
			    	width: 170,
			    	prop: 'publishTime'
			    },
			    {
			    	label: '状态',
			    	align: 'center',
			    	prop: 'status'
			    },
			    {
			    	label: '操作',
			    	align: 'center',
			    	width: 120,
			    	render: (row, column, index) => {
			    		return (
				            <span>
					            <Button type="info" size="small"><Icon name="edit"/></Button>
					            <Button type="danger" size="small"><Icon name="delete"/></Button>
				            </span>
				        )
			    	}
			    }
		    ],
		    data: [],

		    currentPage: 1,
		    total: null,
		    pageSize: 10,
		    showPagination: true,

		    chosenTableItems: [],
		    currentChannel: 0
		}

		// this.getUserList = this.getUserList.bind(this)
	}

	getContentList (currentPage, pageSize, channelId) {
		let url = api.contentList + '?page=' + currentPage + '&pageSize=' + pageSize + '&channelId=' + channelId
		axiosProxy.get(url).then( res => {
			if(res.data.errorCode === 0) {
				let count = res.data.data.total
				let datas = res.data.data.list
				for (let i in datas) {
					if(datas[i].createTime) {
						datas[i].createTime = timestampToTime(datas[i].createTime)
					}
					if(datas[i].publishTime) {
						datas[i].publishTime = timestampToTime(datas[i].publishTime)
					}

					switch(datas[i].status) {
						case 1:
							datas[i].status = '草稿'
							break
						case 5:
							datas[i].status = '已上线'
							break
						case 6:
							datas[i].status = '已下线'
							break
						case 7:
							datas[i].status = '删除'
							break
						default: 
							datas[i].status = '未知状态'
					}
				}
				this.setState ({
					data: datas,
					total: count
				})
			} else {
				if(res.data.errorMessage) {
					console.log('这里提示默认的错误信息')
				} else {
					console.log('这里提示自定义的错误信息')
				}
			}
		})
	}

    componentDidMount () {
		this.getContentList(this.state.currentPage, this.state.pageSize, this.state.currentChannel)
		console.log('看看能不能找到路径面包')
		console.log(this)
	}

	getWeight (index, value) {
		this.state.data[index].weight = value
		let data1 = this.state.data
		this.setState({
			data: data1
		})
	}

	saveWeight () {
		let ids = this.getGroup()[0]
		let weights = this.getGroup()[1]
		let url = api.contentWeight + '?ids=' + ids + '&weights=' + weights
		axiosProxy.put(url).then( res => {
			if(res.data.errorCode === 0) {
				console.log('这里保存权重成功了，要给个提示')
				console.log(res)
				this.refreshTable()
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

	currentChange (node) {
		let pageCount = this.state.pageSize
		let presentPage = this.state.currentPage
		if(arguments[1] === 'size') {
			pageCount = arguments[0]
			presentPage = 1
			this.getContentList(presentPage, pageCount, this.state.currentChannel)
		} else if (arguments[1] === 'current') {
			presentPage = arguments[0]
			this.getContentList(presentPage, pageCount, this.state.currentChannel)
		}
		this.setState({
			pageSize: pageCount,
			currentPage: presentPage
		})
	}

	changeChannel(value) {
		let channelId = value.id
		this.setState({
			currentPage: 1,
			pageSize: 10,
			currentChannel: channelId
		})
		this.getContentList(this.state.currentPage, this.state.pageSize, channelId)
	}

	getSelectedItem (items) {
		let chosenTableItems = items
		this.setState ({
			chosenTableItems: chosenTableItems
		})
	}	

	setTop () {
		let isTop = true
		this.toggleTop(isTop)
	}

	cancelTop () {
		let isTop = false
		this.toggleTop(isTop)
	}

	getGroup () {
		let idsArray = []
		let weightsArray = []
		for (let i in this.state.chosenTableItems) {
			idsArray.push(this.state.chosenTableItems[i].id)
			weightsArray.push(this.state.chosenTableItems[i].weight)
		}
		let weights = weightsArray.join(',')
		let ids = idsArray.join(',')
		return [ids, weights]
	}

	toggleTop (isTop) {
		let ids = this.getGroup()[0]

		let url = api.contentTop + '?ids=' + ids + '&isTop=' + isTop

		axiosProxy.put(url).then( res => {
			if(res.data.errorCode === 0) {
				console.log('这里应该是置顶成功了或是取消置顶成功了,得提醒一下')
				this.refreshTable()
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

	online () {
		let lineStatus = 5
		this.toggleOnline(lineStatus)
	}

	offline () {
		let lineStatus = 6
		this.toggleOnline(lineStatus)
	}

	refreshTable () {
		this.getContentList(this.state.currentPage, this.state.pageSize, this.state.currentChannel)
		this.setState({
			chosenTableItems: []
		})
	}

	toggleOnline (lineStatus) {
		let ids = this.getGroup()[0]
		let url = api.contentOnline + '?status=' + lineStatus + '&ids=' + ids
		axiosProxy.put(url).then( res => {
			if(res.data.errorCode === 0) {
				console.log('这里是上线下线操作完成了,要有操作成功的提示')
				this.refreshTable()
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

	render(show) {
		let deleteButton, weightButton, topButton, cancelTopButton, moveButton, copyButton, onlineButton, offlineButton

		if(this.state.chosenTableItems.length > 0) {
			deleteButton = <Button>删除</Button>
			weightButton = <Button onClick={ this.saveWeight.bind(this) }>保存权重</Button>
			topButton = <Button onClick={ this.setTop.bind(this) }>置顶</Button>
			cancelTopButton = <Button onClick={ this.cancelTop.bind(this) }>取消置顶</Button>
			moveButton = <Button>移动</Button>
			copyButton = <Button>复制</Button>
			onlineButton = <Button onClick={ this.online.bind(this) }>上线</Button>
			offlineButton = <Button onClick={ this.offline.bind(this) }>下线</Button>
		} else {
			deleteButton = <Button disabled>删除</Button>
			weightButton = <Button disabled>保存权重</Button>
			topButton = <Button disabled>置顶</Button>
			cancelTopButton = <Button disabled>取消置顶</Button>
			moveButton = <Button disabled>移动</Button>
			copyButton = <Button disabled>复制</Button>
			onlineButton = <Button disabled>上线</Button>
			offlineButton = <Button disabled>下线</Button>
		}

		if(this.state.showPagination === true) {
			return (
		    	<div>
			    	<Layout.Row gutter={10}>
			    		<Layout.Col span={3}>
			    			<ChannelTree callback={this.changeChannel.bind(this)} />
			    		</Layout.Col>
			    		<Layout.Col span={21}>
			    			<Table
						        columns={this.state.columns}
						        data={this.state.data}
						        border={false}
						        onSelectChange={ this.getSelectedItem.bind(this) }
						        onSelectAll={(selection) => { console.log(selection) }}
						    />

						    <Layout.Row>
						    	<Page total={this.state.total} currentPage={this.state.currentPage} callback={this.currentChange.bind(this)}/>
						    </Layout.Row>

						    <Layout.Row>
						    	{ deleteButton } { weightButton } { topButton } { cancelTopButton } { moveButton } { copyButton } { onlineButton } { offlineButton }
						    </Layout.Row>
			    		</Layout.Col>
			    	</Layout.Row>
		    	</div>
		    )
		} else {
			return null
		}
	}
}

