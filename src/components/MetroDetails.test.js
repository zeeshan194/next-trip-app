import React from 'react'
import { render,fireEvent, screen} from '@testing-library/react';
import MetroDetails from './MetroDetails';

describe('Trip Details', () => {
  test('render trip details', async () => {

    const {container } = render(<MetroDetails 
      detailData={{departures: [
        {
            "actual": true,
            "trip_id": "20247078-DEC21-RAIL-Weekday-01",
            "stop_id": 51405,
            "departure_text": "2 Min",
            "departure_time": 1647614640,
            "description": "to Mpls-Target Field",
            "route_id": "901",
            "route_short_name": "Blue",
            "direction_id": 0,
            "direction_text": "NB",
            "schedule_relationship": "Scheduled"
        }
    ]}}
      loaders={{ main: false, route: false, direction: false, stop: false, table: false }}
    />)

    
    //   const select = container.querySelector('[data-routeid=select-route] > .ant-select-selector');
    //   fireEvent.mouseDown(select); 
      const result = await screen.findAllByText('Blue')
      expect(result).not.toHaveLength(0)
  })
})