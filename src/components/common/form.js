import React from 'react'
import {  Form, Icon, Input, Button, Radio, message } from 'antd'
import {axiosProxy} from './../../tool.js'
import api from './../../api.js'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

class WrappedForm extends React.Component {
	constructor(props) {
  		super(props)

  		this.state = {
  			data: [],
  			currentWay: ''
  		}
	}

	componentDidMount () {
		if(this.props.type == 'detail') {
			this.getStorageDetail()
		} else if(this.props.type == 'edit') {
			this.props.form.validateFields()
		}
	}

	getStorageDetail () {
		let url
		let way
		let id = this.props.element.id
		if(this.props.element.plat === 1) {
			url = api.storageOssInfo
			way = 'oss'
		} else if(this.props.element.plat === 0) {
			url = api.storageFtpInfo
			way = 'ftp'
		}
		this.setState({
			currentWay: way
		})
		axiosProxy.get(url + '/' + id).then( res => {
			if(res.data.errorCode === 0) {
				let datas = res.data.data
				this.setState({
					data: datas
				})
				this.props.form.validateFields()
			} else {
				if (res.data.errorMessage) {
					message.error(res.data.errorMessage)
				} else {
					message.error('操作失败')
				}
			}
		}).catch( error => {
			console.log(error)
		})
	}

	handleSubmit = (e) => {
	    e.preventDefault()
	    this.props.form.validateFields((err, values, type) => {
	        if (!err) {
	        	this.props.callback(values, 'edit')
	        }
	    })
	}

	handleOss = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values, type) => {
			if(!err) {
				this.props.callback(values, 'oss')
			}
		})
	}

	handleFtp = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values, type) => {
			if(!err) {
				this.props.callback(values, 'ftp')
			}
		})
	}

	cancelButton = (e) => {
		this.props.form.validateFields()
		this.props.callback('', 'reset')
	}

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
		// const userNameError = isFieldTouched('userName') && getFieldError('userName')
  //   	const passwordError = isFieldTouched('password') && getFieldError('password')
    	let formType = this.props.type
    	let formBody
    	let elementData
    	if(formType == 'edit') {
    		elementData = this.props.element
    		formBody = 
    			<Form layout="vertical" onSubmit={this.handleSubmit} >
			        <FormItem
			            // validateStatus={userNameError ? 'error' : ''}
			            // help={userNameError || ''}
			            label="名称"
			            >
			            {getFieldDecorator('name', {
			            	rules: [{ required: true, message: 'Please input storage name!' }],
			            	initialValue: elementData.name
			            })(
			            	<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="storage name" />
			            )}
			        </FormItem>

			        <FormItem
			            // validateStatus={passwordError ? 'error' : ''}
			            // help={passwordError || ''}
			            label="路径"
			            >
			          	{getFieldDecorator('rootPath', {
			            	rules: [{ required: true, message: 'Please input root path!' }],
			            	initialValue: elementData.rootPath
			          	})(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="root path" disabled />
			          	)}
			        </FormItem>

			        <FormItem
			            // validateStatus={passwordError ? 'error' : ''}
			            // help={passwordError || ''}
			            label="域名"
			            >
			          	{getFieldDecorator('domain', {
			            	rules: [{ required: true, message: 'Please input domain!' }],
			            	initialValue: elementData.domain
			          	})(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="domain" />
			          	)}
			        </FormItem>

			        <FormItem
			            // validateStatus={passwordError ? 'error' : ''}
			            // help={passwordError || ''}
			            label="类型"
			            >
			          	{getFieldDecorator('plat', {
			            	rules: [{ required: true, message: 'Please input storage type!' }],
			            	initialValue: elementData.plat + ''
			          	})(
			          		<RadioGroup>
				                <Radio value="1">OSS</Radio>
				                <Radio value="0">FTP</Radio>
				            </RadioGroup>
			          	)}
			        </FormItem>

			        <FormItem
			            // validateStatus={passwordError ? 'error' : ''}
			            // help={passwordError || ''}
			            label="允许文件类型"
			            >
			          	{getFieldDecorator('fileType', {
			            	rules: [{ required: true, message: 'Please input storage file type!' }],
			            	initialValue: elementData.fileType + ''
			          	})(
			          		<RadioGroup disabled>
				                <Radio value="1">图片</Radio>
				                <Radio value="0">其他</Radio>
				                <Radio value="2">音视频</Radio>
				                <Radio value="null">均有</Radio>
				            </RadioGroup>
			          	)}
			        </FormItem>

			        <FormItem
			            // validateStatus={passwordError ? 'error' : ''}
			            // help={passwordError || ''}
			            label="是否是默认配置"
			            >
			          	{getFieldDecorator('isDefault', {
			            	rules: [{ required: true, message: 'Please input storage file type!' }],
			            	initialValue: elementData.isDefault + ''
			          	})(
			          		<RadioGroup>
				                <Radio value="true">是</Radio>
				                <Radio value="false">否</Radio>
				            </RadioGroup>
			          	)}
			        </FormItem>

			        <FormItem>
			            <Button
				            type="primary"
				            htmlType="submit"
				            disabled={hasErrors(getFieldsError())}
			            >
			            	确定
			          	</Button>

			          	<Button
				            type="info"
				            style={marginLeft}
				            onClick={this.cancelButton.bind(this)}
			            >
			            	取消
			          	</Button>
			        </FormItem>
			    </Form>
    	} else if (formType == 'detail') {
    		elementData = this.state.data
    		if(this.state.currentWay == 'oss') {
    			formBody = 
    			<Form layout="vertical" onSubmit={this.handleOss}>
    				<FormItem>
			            <Button
				            type="primary"
				            disabled={hasErrors(getFieldsError())}
			            >
			            	编辑
			          	</Button>
			        </FormItem>
			        <FormItem
			        	label="云存储服务商"
			            // validateStatus={userNameError ? 'error' : ''}
			            // help={userNameError || ''}
			            >
			            {getFieldDecorator('type', {
			            	rules: [{ required: false, message: 'Please select a CDN!' }],
			            	initialValue: elementData.type + ''
			            })(
			            	<RadioGroup>
				                <Radio value="1">七牛</Radio>
				                <Radio value="2">金山</Radio>
				            </RadioGroup>
			            )}
			        </FormItem>

			        <FormItem
			        	label="云平台应用id"
			            // validateStatus={userNameError ? 'error' : ''}
			            // help={userNameError || ''}
			            >
			            {getFieldDecorator('appId', {
			            	rules: [{ required: false, message: 'Please input app id' }],
			            	initialValue: elementData.appId
			            })(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="app id" />
			            )}
			        </FormItem>

			        <FormItem
			        	label="空间名称"
			            // validateStatus={userNameError ? 'error' : ''}
			            // help={userNameError || ''}
			            >
			            {getFieldDecorator('bucketName', {
			            	rules: [{ required: false, message: 'Please input space name' }],
			            	initialValue: elementData.bucketName
			            })(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="space name" />
			            )}
			        </FormItem>

			        <FormItem
			        	label="地域标识"
			            // validateStatus={userNameError ? 'error' : ''}
			            // help={userNameError || ''}
			            >
			            {getFieldDecorator('region', {
			            	rules: [{ required: false, message: 'Please input region' }],
			            	initialValue: elementData.region
			            })(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="region" />
			            )}
			        </FormItem>

			        <FormItem
			        	label="云平台应用秘钥"
			            // validateStatus={userNameError ? 'error' : ''}
			            // help={userNameError || ''}
			            >
			            {getFieldDecorator('appSecretId', {
			            	rules: [{ required: false, message: 'Please input appSecretId' }],
			            	initialValue: elementData.appSecretId
			            })(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="appSecretId" />
			            )}
			        </FormItem>

			        <FormItem
			        	label="结束点"
			            // validateStatus={userNameError ? 'error' : ''}
			            // help={userNameError || ''}
			            >
			            {getFieldDecorator('endPoint', {
			            	rules: [{ required: false, message: 'Please input endpoint' }],
			            	initialValue: elementData.endPoint
			            })(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="endpoint" />
			            )}
			        </FormItem>

			        <FormItem>
			            <Button
				            type="primary"
				            htmlType="submit"
				            disabled={hasErrors(getFieldsError())}
			            >
			            	提交
			          	</Button>
			        </FormItem>
			    </Form>
    		} else if(this.state.currentWay == 'ftp') {
    			formBody = 
    			<Form layout="vertical" onSubmit={this.handleFtp}>
    				<FormItem>
			            <Button
				            type="primary"
				            htmlType="submit"
				            disabled={hasErrors(getFieldsError())}
			            >
			            	提交
			          	</Button>
			        </FormItem>
    			</Form>
    		}
    	}
  		return (
		    <div>
		    	{formBody}
		    </div>
  		)
	}
}

const WrappedHorizontalLoginForm = Form.create()(WrappedForm)

export default WrappedHorizontalLoginForm


const marginLeft = {
	'marginLeft': '20px'
}

