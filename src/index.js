import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import 'element-theme-default'
import {Layout, Menu, MessageBox} from 'element-react'

import Users from './components/view/user/users.js'
import Role from './components/view/user/role.js'
import Bread from './components/common/bread.js'
import Drop from './components/common/dropDown.js'

import ContentList from './components/view/content/channel.js'

import ChannelList from './components/view/channel/list.js'

import SiteList from './components/view/config/site/list.js'
import SiteEdit from './components/view/config/site/edit.js'

import ModelList from './components/view/config/model/list.js'
import ModelItems from './components/view/config/model/modelItem/list.js'

import {axiosProxy} from './tool.js'
import api from './api.js'

import Button from 'antd/lib/button';


import './commonStyle/commonHeader.css'
import './index.css'
import './commonStyle/font.css'

class BasicView extends React.Component {
	command (value) {
		console.log('点击了下拉菜单的某一项')
		console.log(value)
		window.location.reload()
	}

	getUserInfo () {
		axiosProxy.get(api.user).then (res => {
			if(res.data.errorCode === 0) {
				let userName = res.data.data.userName
				let userAvatar = res.data.data.headShot
				this.setState ({
					userName: userName,
					userAvatar: userAvatar
				})
				this.getUserSitesList()
			} else {
				if(res.data.errorMessage) {
					console.log('这里提示默认的错误信息')
				} else {
					console.log('这里提示自定义的错误信息')
				}
			}
		}).catch(error => {
			console.log(error)
		})
	}

	getUserSitesList () {
		axiosProxy.get(api.siteList).then(res => {
			if(res.data.errorCode === 0) {
				let sites = res.data.data
				this.setState ({
					siteLists: sites
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

	getSiteDetail (siteId) {
		axiosProxy.get(api.siteDetail + '/' + siteId).then( res => {
			if(res.data.errorCode === 0) {
				let currentLogo = res.data.data.logo
				this.setState ({
					siteLogo: currentLogo
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

	componentDidMount () {
		let siteId = window.localStorage.getItem('currentSite')
		this.getUserInfo()
		this.getSiteDetail(siteId)
		var menu = document.getElementById('side-menu').firstChild
		ReactDOM.findDOMNode(menu).style.height = 'calc(100vh - 64px)'
	}

	logout () {
		MessageBox.confirm('确定退出吗？', '提示', {
		    type: 'warning'
		}).then(() => {
		    window.localStorage.clear()
		    window.open('http://cms.cnlive.com:8768/logout', '_self')
		}).catch(() => {
		    console.log('已取消')
	  	})
	}

	constructor(props) {
  		super(props)

  		this.state = {
  			menuUnique: true,
  			siteLogo: '',
  			siteLists: [],
  			userName: '测试姓名',
  			userAvatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540287846124&di=566d8eab6d5a6c9183efc573fad0bd05&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F014a6658f7a3f0a8012049ef33fb57.jpg%401280w_1l_2o_100sh.png'
  		}
  	}

	render () {
		return (
			<div>
				<Layout.Row>
					<Layout.Col span="24">
						<div className="common-header">
							<Layout.Row>
						        <Layout.Col span="4" offset="1"><div className="grid-content bg-purple">
						        	<Router>
							        	<img src={this.state.siteLogo} alt="" width="autos" height="48" className="site-logo" />
						        	</Router>
						        </div></Layout.Col>
						        <Layout.Col span="5" offset="13"><div className="grid-content bg-purple">

					        		<ul className="header-list">
					        			<li className="list-item">
					        				<div className="profile">
						        				<img src={this.state.userAvatar} alt="" width="36" height="36" />
						        				<span>{this.state.userName}</span>
						        			</div>
					        			</li>

					        			<li className="list-item mleft cursorHand"><i className="iconfont tx-gerenzhongxin"></i></li>

					        			<li className="list-item mleft cursorHand" onClick={ this.logout }><i className="iconfont tx-084tuichu"></i></li>

					        			<li className="list-item mleft cursorHand"><i className="iconfont tx-liulanqi-IE"></i></li>

					        			<li className="list-item mleft">
					        				<Drop/>
					        			</li>
					        		</ul>

						        </div></Layout.Col>
							</Layout.Row>
						</div>
					</Layout.Col>
				</Layout.Row>


				<Layout.Row>
					<Router><div>
						<Layout.Col span="4">
							<div id="side-menu">
						    	 <Menu defaultActive="1-1" className="el-menu-vertical-demo" uniqueOpened={this.state.menuUnique}>
						          	<Menu.SubMenu index="1" title={<span><i className="el-icon-upload"></i>内容管理</span>}>
							            <Menu.Item index="1-1"><Link to="/content/channel">栏目内容管理</Link></Menu.Item>
							            <Menu.Item index="1-2"><Link to="/content/block">区块内容管理</Link></Menu.Item>
							            <Menu.Item index="1-3"><Link to="/content/sync">同步内容管理</Link></Menu.Item>
						          	</Menu.SubMenu>

						            <Menu.Item index="2"><i className="el-icon-menu"></i><Link to="/page">页面管理</Link></Menu.Item>

						            <Menu.Item index="3"><i className="el-icon-setting"></i><Link to="/channel">栏目管理</Link></Menu.Item>

						            <Menu.SubMenu index="4" title={<span><i className="el-icon-picture"></i>用户管理</span>}>
							            <Menu.Item index="4-1"><Link to="/user/group">用户组管理</Link></Menu.Item>
							            <Menu.Item index="4-2"><Link to="/user/role">角色管理</Link></Menu.Item>
							            <Menu.Item index="4-3"><Link to="/user/users">用户人员管理</Link></Menu.Item>
						          	</Menu.SubMenu>

						          	<Menu.SubMenu index="5" title={<span><i className="el-icon-message"></i>配置管理</span>}>
							            <Menu.Item index="5-1"><Link to="/config/site">站点管理</Link></Menu.Item>
							            <Menu.Item index="5-2"><Link to="/config/storage">存储管理</Link></Menu.Item>
							            <Menu.Item index="5-3"><Link to="/config/menu">菜单管理</Link></Menu.Item>
							            <Menu.Item index="5-4"><Link to="/config/api">接口管理</Link></Menu.Item>
							            <Menu.Item index="5-5"><Link to="/config/model">模型管理</Link></Menu.Item>		            
						          	</Menu.SubMenu>

						            <Menu.Item index="6"><i className="el-icon-star-on"></i><Link to="/resources">资源管理</Link></Menu.Item>	          	
						        </Menu>
						    </div>
						</Layout.Col>

						<Layout.Col span="20">
							<div style={breadStyle}>
					    		<Bread />
					    	</div>
					    	<div className="main-content" style={layoutStyle}>
							    <Route path="/user/users" component={Users}/>
							    <Route path="/user/role" component={Role}/>
							    <Route path="/content/channel" component={ContentList}/>
							    <Route path="/channel" component={ChannelList}/>
							    <Route exact path="/config/site" component={SiteList}/>
							    <Route path="/config/site/edit" component={SiteEdit}/>
							    <Route path="/config/site/add" component={SiteEdit}/>
							    <Route exact path="/config/model" component={ModelList}/>
							    <Route path="/config/model/items" component={ModelItems}/>
					    	</div>	
						</Layout.Col>
					</div></Router>
				</Layout.Row>
			</div>
		)
	}
}

let layoutStyle = {
	paddingLeft: '30px',
	paddingRight: '30px',
	paddingTop: '20px'
}

let breadStyle = {
	paddingTop: '20px',
	paddingRight: '30px',
	paddingLeft: '30px'
}

ReactDOM.render(<BasicView />, document.getElementById('root'))

serviceWorker.unregister()
