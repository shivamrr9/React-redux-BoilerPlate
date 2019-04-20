import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
// Component to be tested
import Daycard from './../../src/components/Daycard';

describe('<Daycard />', () => {
      test('renders the Daycard component', () => {
      const tree= renderer.create(<DayCard />).toJSON();
  
        expect(tree).toMatchSnapshot();
      });
  });