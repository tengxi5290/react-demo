import React from 'react'
import {Layout, Button, Form, Input, Radio, Message} from 'element-react'
import api from './../../../../api.js'
import {axiosProxy} from './../../../../tool.js'

import SiteTree from './../../../common/siteTree.js'
import Uploader from './../../../common/uploader.js'

import './../../../../commonStyle/common.css'

export default class SiteEdit extends React.Component {
	constructor(props) {
  	super(props)

  	this.state = {
	    pageType: null,
	    showForm: true,
	    form: {
	        name: '',
	        shortName: '',
	        domain: '',
	        rootPath: '',
	        enable: '是',
	        logo: ''
	    }
  	}
}

    componentDidMount () {
    	let pageType, siteId
    	if(this.props.location.query) {
    		pageType = this.props.location.query.type
	    	siteId = this.props.location.query.id
	    	window.sessionStorage.setItem('pageType', pageType)
	    	window.sessionStorage.setItem('siteId', siteId)
    	} else {
    		pageType = window.sessionStorage.getItem('pageType')
    		siteId = window.sessionStorage.getItem('siteId')
    	}
    	this.setState({
    		pageType: pageType,
    		siteId: siteId
    	})
    	this.getSiteDetail(siteId)
	}

	getSiteDetail (id) {
		this.setState ({
			showForm: false
		})
		axiosProxy.get(api.siteDetail + '/' + id).then( res => {
			if(res.data.errorCode === 0) {
				this.state.form.logo = res.data.data.logo
				this.state.form.name = res.data.data.name
				this.state.form.shortName = res.data.data.shortName
				this.state.form.rootPath = res.data.data.rootPath
				this.state.form.domain = res.data.data.domain
				if(res.data.data.enable === true) {
					this.state.form.enable = '是'
				} else {
					this.state.form.enable = '否'
				}
				this.setState ({
					form: this.state.form,
					showForm: true
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
		}).catch( error => {
			console.log(error)
		})
	}

	onSubmit(e) {
	    e.preventDefault()
	    console.log('提交参数')
	    console.log(this.state.form)
	}

	onChange(key, value) {
	    this.state.form[key] = value
	    this.forceUpdate()
	}

	changeChannel (value) {
		if(value.id != -1) {
			this.getSiteDetail(value.id)
		}
	}

	reset () {
		this.setState({
			showForm: false
		})
		for (let i in this.state.form) {
			this.state.form[i] = ''
		}
		this.state.form.enable = '是'
		setTimeout (() => {
			this.setState({
				showForm: true,
				form: this.state.form
			})
		}, 100)
	}

	getUrl (path, imageUrl, storageId) {
		this.state.form.logo = path
		this.setState({
			form: this.state.form
		})
	}

	render(show) {
		let uploadComponent, submitButton
		if (this.state.showForm === true) {
			uploadComponent = <Uploader callback={this.getUrl.bind(this)} url={this.state.form.logo} />
		} else {
			uploadComponent = null
		}

		if (this.state.pageType == 'update') {
			submitButton = <Button type="primary" nativeType="submit">更新</Button>
		} else if (this.state.pageType == 'add') {
			submitButton = <Button type="primary" nativeType="submit">立即创建</Button>
		}

		return (
	    	<div>
			    <Layout.Row gutter={10}>
			    	<Layout.Col span="3">
			    		<SiteTree callback={this.changeChannel.bind(this)} />
			    	</Layout.Col>
			    	<Layout.Col span="21">

			    		<Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
			    			<Layout.Row>
			    				<Layout.Col span="12">
			    					<Form.Item label="名称">
								        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
								    </Form.Item>
			    				</Layout.Col>
			    				<Layout.Col span="12">
			    					<Form.Item label="站点简称">
								        <Input value={this.state.form.shortName} onChange={this.onChange.bind(this, 'shortName')}></Input>
								    </Form.Item>
			    				</Layout.Col>
			    			</Layout.Row>

			    			<Layout.Row>
			    				<Layout.Col span="12">
			    					<Form.Item label="域名">
								        <Input value={this.state.form.domain} onChange={this.onChange.bind(this, 'domain')}></Input>
								    </Form.Item>
			    				</Layout.Col>
			    				<Layout.Col span="12">
			    					<Form.Item label="根目录">
								        <Input disabled value={this.state.form.rootPath} onChange={this.onChange.bind(this, 'rootPath')}></Input>
								    </Form.Item>
			    				</Layout.Col>
			    			</Layout.Row>

							    
							<Layout.Row>
			    				<Layout.Col span="12">
			    					<Form.Item label="是否可用">
								        <Radio.Group value={this.state.form.enable} onChange={this.onChange.bind(this, 'enable')}>
								            <Radio value="是"></Radio>
								            <Radio value="否"></Radio>
								        </Radio.Group>
								    </Form.Item>
			    				</Layout.Col>
			    				<Layout.Col span="12">
			    					<Form.Item label="站点图标">
			    						{uploadComponent}
								    </Form.Item>
			    				</Layout.Col>
			    			</Layout.Row>	    

						    <Form.Item>
						        {submitButton}
						        <Button onClick={this.reset.bind(this)}>重置</Button>
						    </Form.Item>
						</Form>
					</Layout.Col>
		    	</Layout.Row>
	    	</div>
	    )
	}
}
