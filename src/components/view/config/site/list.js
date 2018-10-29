import React from 'react'
import {Layout} from 'element-react'
import api from './../../../../api.js'
import {axiosProxy} from './../../../../tool.js'

import SiteTree from './../../../common/siteTree.js'

export default class Users extends React.Component {
	constructor(props) {
  		super(props);

		this.state = {
			
		}
	}

    componentDidMount () {

	}

	changeChannel (value) {
		console.log('点击站点树的回调事件')
		console.log(value)
	}

	render(show) {
		return (
	    	<div>
			    <Layout.Row gutter={10}>
		    		<Layout.Col span={3}>
		    			<SiteTree callback={this.changeChannel.bind(this)} />
		    		</Layout.Col>
		    		<Layout.Col span={21}>
		    			站点列表的表格咯
		    		</Layout.Col>
		    	</Layout.Row>
	    	</div>
	    )
	}
}
