import React from 'react'
import { Row, Col, Input } from 'antd'

const { Search } = Input

const MetroSearchStop = ({onSearchStop}) => {
  return (
    <Row>
        <Col lg={{span: 8, offset: 8}} xs={{span: 24}}>
            <Search size='large' placeholder="input search text" onSearch={value => onSearchStop(value)} />
        </Col>
    </Row>
  )
}

export default MetroSearchStop