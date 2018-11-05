import React from 'react'
import {Layout, Table, Button, Icon} from 'element-react'
import api from './../../../../api.js'
import {axiosProxy} from './../../../../tool.js'

import SiteTree from './../../../common/siteTree.js'

export default class ModelList extends React.Component {
	constructor(props) {
  	super(props);

  	this.state = {
	    columns: [
	      {
	        type: 'selection'
	      },
	      {
	        label: "ID",
	        prop: "id",
	        align: 'center'
	      },
	      {
	        label: "域名",
	        prop: "domain",
	        width: 300,
	        align: 'center'
	      },
	      {
	      	align: 'center',
	        label: "站点名称",
	        prop: "name",
	        width: 480
	      },
	      {
	      	align: 'center',
	      	label: '操作',
	      	width: 80,
	      	render: (row, column, index) => {
	    		return (
		            <span>
			            <Button type="info" size="small" onClick={this.toEdit.bind(this, index)}><Icon name="edit" /></Button>
		            </span>
		        )
	    	}
	      }
	    ],
	    data: []
  	}
}

    componentDidMount () {
    	this.getSiteList()
	}

	changeChannel (value) {
		if(value.id !== -1) {
			let siteId = value.id
			this.props.history.push({
		        pathname: '/config/site/edit',
		        query: {
		            type: 'update',
		            id: siteId
		        }
		    })	
		}
	}

	toEdit (index, value) {
		let siteId = this.state.data[index].id
		this.props.history.push({
	        pathname: '/config/site/edit',
	        query: {
	            type: 'update',
	            id: siteId
	        }
	    })	
	}

	getSiteList () {
		axiosProxy.get(api.siteList).then( res => {
			if(res.data.errorCode === 0) {
				let tableData = res.data.data
				this.setState({
					data: tableData
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

	newSite () {
		this.props.history.push('/config/site/add', 'add')
	}

	render(show) {
		return (
	    	<div>
			    <Layout.Row gutter={10}>
		    		<Layout.Col span={3}>
		    			<SiteTree callback={this.changeChannel.bind(this)} />
		    		</Layout.Col>
		    		<Layout.Col span={21}>
		    			<Layout.Row style={buttonStyle}>
							<Button type="primary" onClick={this.newSite.bind(this)}>新建站点</Button>		    				
		    			</Layout.Row>
		    			<Table
						    style={{width: '100%'}}
						    columns={this.state.columns}
						    data={this.state.data}
						    border={true}
						    onSelectChange={(selection) => { console.log(selection) }}
						    onSelectAll={(selection) => { console.log(selection) }}
						/>
		    		</Layout.Col>
		    	</Layout.Row>
	    	</div>
	    )
	}
}

let buttonStyle = {
	'paddingTop': '20px',
	'paddingBottom': '20px'
}