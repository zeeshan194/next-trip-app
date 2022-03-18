import React from 'react'
import { render,fireEvent, screen} from '@testing-library/react';
import MetroRoutes from './MetroRoutes';

describe('Next Trip', () => {
  test('Directions are loading correctly', async () => {

    const {container } = render(<MetroRoutes 
      routeData={[{route_id: 'metro_blue_line', route_label: "METRO Blue Line"}]}
      selectedRoute={'metro_blue_line'} 
      onChangeRoute={() => null}
      loaders={{ main: false, route: false, direction: false, stop: false, table: false }}
    />)

    
      const select = container.querySelector('[data-routeid=select-route] > .ant-select-selector');
      fireEvent.mouseDown(select); 
      const result = await screen.findAllByRole('option')
      expect(result).not.toHaveLength(0)
  })
})