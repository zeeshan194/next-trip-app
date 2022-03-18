import React from 'react'
import { Row, Col, Select } from 'antd'

const { Option } = Select;

const MetroRoutes = ({ routeData, selectedRoute, onChangeRoute, loaders }) => {
    return (
        <Row>
            <Col lg={{span: 8, offset: 8}} xs={{span: 24}}>
                <Select
                    showSearch
                    size='large'
                    style={{ width: '100%' }}
                    placeholder='Select Route'
                    optionFilterProp='children'
                    onChange={onChangeRoute}
                    value={selectedRoute}
                    loading={loaders?.route}
                    className='select-routes'
                    data-routeid='select-route'
                >
                    {
                        routeData?.map(route => {
                            return (
                                <Option key={route.route_id} value={route.route_id}>{route.route_label}</Option>
                            )
                        })
                    }
                </Select>
            </Col>
        </Row>
    )
}

export default MetroRoutes