import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import 'element-theme-default';
import {Button, Layout, Menu, Dropdown} from 'element-react';
import './commonStyle/commonHeader.css';

import Users from './components/view/user/users.js';
import Role from './components/view/user/role.js';
import Bread from './components/common/bread.js';

class BasicView extends React.Component {
	command (value) {
		console.log('点击了下拉菜单的某一项')
		console.log(value)
		window.location.reload()
	}

	componentDidMount () {
		var menu = document.getElementById('side-menu').firstChild
		ReactDOM.findDOMNode(menu).style.height = 'calc(100vh - 64px)'
		// this.props.history.push("/")
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
							        	<Link to="/">
							        		<img src="http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg" alt="" width="48" height="48" className="site-logo" />
							        	</Link>
						        	</Router>
						        </div></Layout.Col>
						        <Layout.Col span="5" offset="13"><div className="grid-content bg-purple">

					        		<ul className="header-list">
					        			<li className="list-item">
					        				<div className="profile">
						        				<img src="http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg" alt="" width="36" height="36" />
						        				<span>藤西</span>
						        			</div>
					        			</li>

					        			<li className="list-item mleft"><Router><Link to="/user"><i className="el-icon-message"></i></Link></Router></li>

					        			<li className="list-item mleft"><Router><Link to="/logout"><i className="el-icon-setting"></i></Link></Router></li>

					        			<li className="list-item mleft"><Router><Link to="/preview"><i className="el-icon-menu"></i></Link></Router></li>

					        			<li className="list-item mleft">
					        				<Dropdown menu={(
											    <Dropdown.Menu>
											        <Dropdown.Item command="黄金糕">黄金糕</Dropdown.Item>
											        <Dropdown.Item command="狮子头">狮子头</Dropdown.Item>
											        <Dropdown.Item command="螺蛳粉">螺蛳粉</Dropdown.Item>
											        <Dropdown.Item command="双皮奶">双皮奶</Dropdown.Item>
											        <Dropdown.Item command="蚵仔煎">蚵仔煎</Dropdown.Item>
											      </Dropdown.Menu>
											    )} onCommand={this.command.bind(this)}>
											    <span className="el-dropdown-link">
											        下拉菜单<i className="el-icon-caret-bottom el-icon--right"></i>
											    </span>
										    </Dropdown>
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
						    	<Menu defaultActive="1-1" className="el-menu-vertical-demo">
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
					    	</div>	
						</Layout.Col>
					</div></Router>
				</Layout.Row>
			</div>
		)
	}
}

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
        <Button type="primary" >Hello</Button>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

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

ReactDOM.render(<BasicView />, document.getElementById('root'));

serviceWorker.unregister();
