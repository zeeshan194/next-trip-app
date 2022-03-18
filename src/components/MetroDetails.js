import React, { useEffect, useState } from 'react'
import { Row, Col, Table } from 'antd'

const MetroDetails = ({ detailData, loaders }) => {
    const [expanded, setExpanded] = useState(false)
    const [departures, setDepartures] = useState([])
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

    const loadInitialDepartureData = () => {
        const departurePhase1 = detailData?.departures?.slice(0, 3);
        let departurePhase1plus = departurePhase1
        if (departurePhase1?.length > 2) {
            departurePhase1plus.push({
                actual: false,
                departure_text: "",
                departure_time: 1647631200,
                description: "",
                direction_id: null,
                direction_text: "",
                route_id: "new",
                route_short_name: "Departure",
                schedule_relationship: "",
                stop_id: null,
                trip_id: "new"
            })
        }
        return departurePhase1plus
    }

    useEffect(() => {
        loadInitialDepartureData()
        setDepartures(loadInitialDepartureData())
    }, [detailData?.departures])


    const updateDepartureHandler = (expanded, record) => {

        if (expanded) {
            const prevDepartures = detailData?.departures?.slice(2, detailData?.departures?.length);
            const newDepartures = [...departures]
            newDepartures.splice(newDepartures?.length - 1, 0, ...prevDepartures)
            setDepartures(newDepartures)
        } else {
            setDepartures(loadInitialDepartureData())
        }
    }

    return (
        <Row>
            <Col span={24} style={{ marginTop: '15px' }}>
                {detailData?.stops && <Row className='stop-container' justify="space-between">
                    <Col span={12}>
                        <div className='stop-name'>{detailData?.stops[0]?.description}</div>
                    </Col>
                    <Col span={12}>
                        <div className='stop-info'>
                            <span className='stop-text'>Stop #:</span>
                            <span className='stop-number'>{detailData?.stops[0]?.stop_id}</span>
                        </div>
                    </Col>
                </Row>}
                <Row justify="space-around">
                    <Col xs={24}>
                        <Table
                            align='center'
                            pagination={false}
                            loading={loaders.table}
                            dataSource={departures?.map(detail => ({
                                key: detail.trip_id,
                                route: detail.route_short_name,
                                destination: detail.description,
                                departs: detail.departure_text,
                            }))}
                            columns={columns}
                            expandable={{
                                columnWidth:'10px',
                                indentSize: 10,
                                expandedRowRender: (record, index, indent, expanded) => <p></p>,
                                rowExpandable: record => record.key === 'new',
                                onExpand: (expanded, record) => updateDepartureHandler(expanded, record)
                            }}
                        />
                        {/* <Table
                            align='center'
                            pagination={false}
                            loading={loaders.table}
                            dataSource={departures?.map(detail => ({
                                key: detail.trip_id,
                                route: detail.route_short_name,
                                destination: detail.description,
                                departs: detail.departure_text,
                            }))} 
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record, index, indent, expanded) => <p></p>,
                                rowExpandable: record => record.key === 'new',
                                onExpand: (expanded, record) => updateDepartureHandler(expanded, record)
                              }}
                        /> */}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default MetroDetails