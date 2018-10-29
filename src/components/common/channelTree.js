import React from 'react'
import {Tree} from 'element-react'
import {axiosProxy} from './../../tool.js'
import api from './../../api.js'
import './../../commonStyle/common.css'

export default class ChannelTree extends React.Component {
	constructor(props) {
  		super(props)

  		this.state = {
			regions: [{
		    	'name': 'region1'
		    }, {
		        'name': 'region2'
		    }]
		}

		this.options = {
		    label: 'name',
		    children: 'zones'
		}
		this.count = 1
	}

	getTreeNodes (id, resolve) {
		if(id === -1) {
			id = 0
		}
		axiosProxy.get(api.contentChannel + '/' + id).then( res => {
			if(res.data.errorCode === 0) {
				console.log('这是此次拿到的子树')
				console.log(res)
				setTimeout(() => {
					let data = res.data.data
			    	resolve(data)
			  	}, 500)
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

	loadNode(node, resolve) {

		if (node.level === 0) {
	    	return resolve([
	    		{
	    			name: '根目录',
	    			id: -1,
	    			disabled: true
	    		}
	    	])
	  	}

	  	if(node.level >= 1) {
			this.getTreeNodes(node.data.id, resolve)
	  	}
	}

	render() {
		const { regions } = this.state
  		return (
		    <div>
			    <Tree
	      			data={regions}
	      			options={this.options}
	      			lazy={true}
	      			load={this.loadNode.bind(this)}
	      			onNodeClicked={ (value) => { this.props.callback(value) } }
	    		/>
		    </div>
  		)
	}
}