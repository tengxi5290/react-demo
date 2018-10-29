import React from 'react'
import {Alert} from 'element-react'
// import './../../commonStyle/common.css'

export default class Toast extends React.Component {
	constructor(props) {
  		super(props)
  		console.log('这是提示信息框的props信息')
  		console.log(props)
	}

	render() {
  		return (
		    <div>
		        <Alert title={ this.props.alertTitle } type={ this.props.alertType }/>
		    </div>
  		)
	}
}