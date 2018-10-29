import React from 'react'
import {Dropdown} from 'element-react'
import {axiosProxy} from './../../tool.js'
import api from './../../api.js'
import './../../commonStyle/common.css'

export default class Drop extends React.Component {
	constructor(props) {
  		super(props)

  		this.state = {
  			data: [],
  			presentSiteId: null,
  			presentSiteName: null
  		}
	}

	setSite (command) {
		console.log('这是当前选中的站点id')
		console.log(command)
		window.localStorage.setItem('currentSite', command)
		axiosProxy.put(api.siteChange + '/' + command).then( res => {
			if(res.data.errorCode === 0) {
				window.open('/', '_self')
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

	getSites () {
		axiosProxy.get(api.siteList).then(res => {
			if(res.data.errorCode === 0) {
				let currentSiteId, currentSiteName
				let sites = res.data.data
				for (let i in res.data.data) {
					if(res.data.data[i].current === true) {
						currentSiteId = res.data.data[i].id
						currentSiteName = res.data.data[i].shortName
						window.localStorage.setItem('currentSite', currentSiteId)
						window.localStorage.setItem('currentSiteName', currentSiteName)
					}
				}
				this.setState ({
					data: sites,
					presentSiteId: currentSiteId,
					presentSiteName: currentSiteName
				})
			} else {
				if(res.data.errorMessage) {
					console.log('这里提示默认的错误信息')
				} else {
					console.log('这里提示自定义的错误信息')
				}
			}
		}).catch (error => {
			console.log(error)
		})
	}

	componentDidMount () {
		this.getSites()
	}

	render() {
		const dropDownItems = []
		for (let item in this.state.data) {
			dropDownItems.push(
				<Dropdown.Item key={item} command={'' + this.state.data[item].id}>{this.state.data[item].shortName}</Dropdown.Item>
			)
		}
  		return (
		    <Dropdown menu={(
			    <Dropdown.Menu>
			        <div>{dropDownItems}</div>
			    </Dropdown.Menu>
			)} onCommand={ this.setSite.bind(this) }>
			    <span className="el-dropdown-link">
			        {this.state.presentSiteName}<i className="el-icon-caret-bottom el-icon--right"></i>
			    </span>
		    </Dropdown> 
  		)
  		return null
	}
}