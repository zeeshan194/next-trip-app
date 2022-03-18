import React from 'react'
import { render,fireEvent, screen} from '@testing-library/react';
import MetroDirections from './MetroDirections';

describe('Next Trip', () => {
  test('Directions are loading correctly', async () => {

    const {container } = render(<MetroDirections 
      directionData={[{direction_id: 'southbound', direction_name: "Southbound"}]}
      selectedRoute={'southbound'} 
      onChangeRoute={() => null}
      loaders={{ main: false, route: false, direction: false, stop: false, table: false }}
    />)

    
      const select = container.querySelector('[data-directionid=select-direction] > .ant-select-selector');
      fireEvent.mouseDown(select); 
      const result = await screen.findAllByRole('option')
      expect(result).not.toHaveLength(0)
  })
})