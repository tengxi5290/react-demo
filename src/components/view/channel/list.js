import React from 'react';
// import Button from 'antd/lib/button';
import { Button, Row, Col } from 'antd';


export default class ChannelList extends React.Component {
	render() {
	    return (
	      <div className="App">
	        <Button type="primary">Button</Button>
	        <Row>
		      	<Col span={12}>12-1</Col>
		      	<Col span={12}>12-2</Col>
		    </Row>
	      </div>
	    );
  	}
}