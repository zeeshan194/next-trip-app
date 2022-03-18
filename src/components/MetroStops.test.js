import React from 'react'
import { render,fireEvent, screen} from '@testing-library/react';
import MetroStops from './MetroStops';

describe('Next Trip', () => {
  test('Stops are loading correctly', async () => {
    window.fetch = jest.fn()
    window.fetch.mockResolvedValueOnce({
      json: async () => [{
          place_code: 'HHTE',
          description: "MSP Airport Terminal 2 - Humphrey Station"
        }]
    })
    const {container, getByText } = render(<MetroStops 
      stopData={[{
        place_code: 'HHTE',
        description: "MSP Airport Terminal 2 - Humphrey Station"
    }]}
      selectedRoute={'HHTE'} 
      onChangeRoute={() => null}
      loaders={{ main: false, route: false, direction: false, stop: false, table: false }}
    />)
    // setTimeout(() => {

    
      const select = container.querySelector('[data-stopid=select-stops] > .ant-select-selector');
      fireEvent.mouseDown(select); 
      const result = await screen.findAllByRole('option')
      expect(result).not.toHaveLength(0)
  })
})