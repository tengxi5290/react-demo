import React from 'react'
import {Pagination} from 'element-react'
import './../../commonStyle/common.css'

export default class Page extends React.Component {
	// constructor(props) {
 //  		super(props)
	// }

	render() {
  		return (
		    <div className="block pagination-part">
		        <Pagination layout="total, sizes, prev, pager, next" total={this.props.total} pageSizes={[10, 20, 30, 40]} pageSize={10} currentPage={this.props.currentPage} onCurrentChange={ (value) => { this.props.callback(value, 'current') }} onSizeChange={ (value) => { this.props.callback(value, 'size') } }/>
		    </div>
  		)
	}
}