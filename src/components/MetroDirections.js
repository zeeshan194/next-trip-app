import React from 'react'
import { Row, Col, Select } from 'antd'

const { Option } = Select;

const MetroRoutes = ({ directionData, selectedDirection, onChangeDirection, loaders }) => {
  return (
    <Row>
      <Col style={{ marginTop: '10px' }} span={8} offset={8}>
        <Select
          showSearch
          size='large'
          style={{ width: 350 }}
          placeholder='Select Direction'
          optionFilterProp='children'
          value={selectedDirection}
          onChange={onChangeDirection}
          loading={loaders.direction}
          data-directionid='select-direction'
        >
          {directionData?.map(direction => {
            return (
              <Option key={direction.direction_id} value={direction.direction_id}>{direction.direction_name}</Option>
            )
          })}
        </Select>
      </Col>
    </Row>
  )
}

export default MetroRoutes