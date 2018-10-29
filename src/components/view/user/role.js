import React from 'react'
import {Table} from 'element-react';

export default class Users extends React.Component {
	constructor(props) {
  		super(props);

		this.state = {
		    columns: [
			    {
			        type: 'selection'
			    },
			    {
			        label: "日期",
			        prop: "date"
			    },
			    {
			        label: "姓名",
			        prop: "name"
			    },
			    {
			        label: "地址",
			        prop: "address"
			    }
		    ],
		    data: [{
		        date: '2016-05-01',
		        name: '藤西',
		        province: '上海',
		        city: '普陀区',
		        address: '上海市普陀区金沙江路 1518 弄',
		        zip: 200333
		    }, {
		        date: '2016-05-02',
		        name: '藤西',
		        province: '上海',
		        city: '普陀区',
		        address: '上海市普陀区金沙江路 1518 弄',
		        zip: 200333
		    }, {
		        date: '2016-05-03',
		        name: '藤西',
		        province: '上海',
		        city: '普陀区',
		        address: '上海市普陀区金沙江路 1518 弄',
		        zip: 200333
		    }]
		}
	}

	render() {
	    return (
		    <Table
		        columns={this.state.columns}
		        data={this.state.data}
		        border={true}
		        onSelectChange={(selection) => { console.log(selection) }}
		        onSelectAll={(selection) => { console.log(selection) }}
		    />
	    )
	}
}


