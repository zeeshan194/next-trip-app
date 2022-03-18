import './App.css';
import { Row, Col, Divider, Tabs, Spin, Input } from 'antd'
import {  InfoCircleFilled } from '@ant-design/icons'
import 'antd/dist/antd.css';
import MetroRoutes from './components/MetroRoutes';
import MetroStops from './components/MetroStops';
import MetroDirections from './components/MetroDirections';
import MetroDetails from './components/MetroDetails';
import { useEffect, useState } from 'react';
import MetroSearchStop from './components/MetroSearchStop';
import { Fragment } from 'react';

const { TabPane } = Tabs;
const { Search } = Input;

function App() {

  const [routeData, setRouteData] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [directionData, setDirectionData] = useState([])
  const [selectedDirection, setSelectedDirection] = useState(null)
  const [stopData, setStopData] = useState([])
  const [selectedStop, setSelectedStop] = useState(null)
  const [detailData, setDetailData] = useState([])
  const [loaders, setLoaders] = useState({ main: true, route: true, direction: false, stop: false, table: false })

  useEffect(async () => {
    const response = await fetch(`https://svc.metrotransit.org/nextripv2/routes`)
    const routesInResponse = await response.json()
    setRouteData(routesInResponse)
    // setRouteData([])
    setDirectionData([])
    setStopData([])
    setSelectedDirection(null)
    setSelectedStop(null)
    setLoaders({ ...loaders, main: false, route: false })
  }, [])

  const onChangeRoute = async (routeId) => {
    setLoaders({ ...loaders, direction: true })
    setDirectionData([])
    const response = await fetch(`https://svc.metrotransit.org/nextripv2/directions/${routeId}`)
    const directionInResponse = await response.json()
    setDirectionData(directionInResponse)
    setSelectedRoute(routeId)
    setStopData([])
    setSelectedDirection(null)
    setSelectedStop(null)
    setLoaders({ ...loaders, direction: false })
    setDetailData([])
  }
  const onChangeDirection = async (directionId) => {
    setLoaders({ ...loaders, stop: true })
    const response = await fetch(`https://svc.metrotransit.org/nextripv2/stops/${selectedRoute}/${directionId}`)
    const stopsInresponse = await response.json()
    setSelectedStop(null)
    setStopData(stopsInresponse)
    setSelectedDirection(directionId)
    setLoaders({ ...loaders, direction: false, stop: false })
    setDetailData([])
  }

  const onChangeStop = async (stopId) => {
    setLoaders({ ...loaders, table: true })
    const response = await fetch(`https://svc.metrotransit.org/nextripv2/${selectedRoute}/${selectedDirection}/${stopId}`)
    const detailInResponse = await response.json()
    setDetailData(detailInResponse)
    setSelectedStop(stopId)
    setLoaders({ ...loaders, stop: false })
  }

  const onSearchStop = async (stopId) => {
    setLoaders({ ...loaders, table: true })
    const response = await fetch(`https://svc.metrotransit.org/nextripv2/${stopId}`)
    const detailInResponse = await response.json()
    setDetailData(detailInResponse)
    setLoaders({ ...loaders, table: false })
  }

  return (
    <div className='main-container'>
      <div className='header'>
        <Row>
          <Col span={24}>
          <p>
          <span className='info-icon'><InfoCircleFilled style={{ fontSize: '16px', color: '#626462' }} /></span>
          <span className="alert-title">Here when you're ready&nbsp;</span>
          <span className="pipe">|</span> 
          The federal mask mandate for public transportation – including buses, trains, and airplanes, has been extended through April 18, regardless of vaccination status.&nbsp;
          <a href="https://www.metrotransit.org/health" target='_blank'><strong>See how Metro Transit is keeping your ride safe.</strong></a>&nbsp;
          </p>
          </Col>
        </Row>
      </div>
      <div className="app-container site-card-border-less-wrapper">
        <Row>
          <Col span={24}>
            <div className='heading'>Real-time Departures</div>
          </Col>
        </Row>
        <Tabs type="card" centered={true}>
          <TabPane tab="By route" key="1">
            <div>
              {
                loaders.main ?
                  <Row style={{ marginTop: '100px' }}>
                    <Col span={2} offset={11}>
                      <Spin size="large" tip="Loading..." />
                    </Col>
                  </Row>
                  :
                  <Fragment>

                    <MetroRoutes
                      routeData={routeData}
                      selectedRoute={selectedRoute}
                      onChangeRoute={onChangeRoute}
                      loaders={loaders}
                    />
                    {selectedRoute &&

                      <MetroDirections
                        directionData={directionData}
                        selectedDirection={selectedDirection}
                        onChangeDirection={onChangeDirection}
                        loaders={loaders}
                      />
                    }
                    {(selectedDirection || selectedDirection == 0) &&

                      <MetroStops
                        stopData={stopData}
                        selectedStop={selectedStop}
                        onChangeStop={onChangeStop}
                        loaders={loaders}
                      />
                    }
                    <MetroDetails
                      detailData={detailData}
                      loaders={loaders}
                    />
                  </Fragment>
              }
            </div>
          </TabPane>
          <TabPane tab="By Stop #" key="2">
            <div>
              <MetroSearchStop
                onSearchStop={onSearchStop}
              />
              <MetroDetails
                detailData={detailData}
                loaders={loaders}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
