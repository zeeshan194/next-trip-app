import React from 'react'
import { Row, Col, Select } from 'antd'

const { Option } = Select;

const MetroStops = ({ stopData, selectedStop, onChangeStop, loaders }) => {
  return (
    <Row>
      <Col style={{ marginTop: '10px' }} span={8} offset={8}>
        <Select
          showSearch
          size='large'
          style={{ width: 350 }}
          placeholder='Select Stop'
          optionFilterProp='children'
          value={selectedStop}
          onChange={onChangeStop}
          loading={loaders.stop}
          data-stopid='select-stops'
        >
          {
            stopData?.map(stop => {
              return (
                <Option key={stop.place_code} value={stop.place_code}>{stop.description}</Option>
              )
            })
          }
        </Select>
      </Col>
    </Row>
  )
}

export default MetroStops