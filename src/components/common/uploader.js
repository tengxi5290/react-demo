import React from 'react'
import {axiosProxyFiles} from './../../tool.js'
import api from './../../api.js'
import './../../commonStyle/common.css'
import './../../commonStyle/uploader.css'

export default class Uploader extends React.Component {
	constructor(props) {
  		super(props)

  		this.state = {
		    path: '',
		    imageUrl: '',
		    storageId: ''
		}
	}

	componentDidMount () {
		let defaultImage = this.props.url
		this.setState({
			imageUrl: defaultImage
		})
	}

	changeFile (key, value) {
		let inputValue = document.getElementById('uploader').files[0]
		let formData = new FormData()
		formData.append('file', inputValue)
		axiosProxyFiles.post(api.uploadPicture, formData).then( res => {
			if(res.data.errorCode === 0) {
				console.log('这里图片上传成功了，需要给个提示')
				this.setState ({
					path: res.data.data.path,
					imageUrl: res.data.data.url,
					storageId: res.data.data.storageId
				})
				this.props.callback(this.state.path, this.state.imageUrl, this.state.storageId)
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

	render() {
		let icon 
		if(this.state.imageUrl !== '') {
			icon = ''
		} else {
			icon = <i className="el-icon-plus"></i>
		}
  		return (
		    <div className="uploader">
		    	<div className="uploader-container" style={{'backgroundImage': 'url(' + this.state.imageUrl + ')'}}>
		    		{icon}
		    	</div>
		    	<input type="file" className="uploader-action" onChange={this.changeFile.bind(this)} id="uploader" />
		    </div>
  		)
	}
}

