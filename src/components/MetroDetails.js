import React from 'react'
import { Row, Col, Table } from 'antd'

const MetroDetails = ({detailData, loaders}) => {

    const columns = [
        {
            title: 'Route',
            dataIndex: 'route',
            key: 'route',
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: 'Departs',
            dataIndex: 'departs',
            key: 'departs',
        },
    ];

    return (
        <Row>
            <Col span={24} style={{marginTop: '15px'}}>
                <Table
                    align='center'
                    pagination={false}
                    loading={loaders.table}
                    dataSource={detailData?.departures?.map(detail => ({ 
                        key: detail.trip_id, 
                        route: detail.route_short_name,
                        destination: detail.description,
                        departs: detail.departure_text 
                    }))} columns={columns}
                />
            </Col>
        </Row>
    )
}

export default MetroDetails