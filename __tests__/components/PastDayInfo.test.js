import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import PastDayInfo from './../../src/components/PastDayInfo';

describe('<PastDayInfo />', () => {
    describe('render()', () => {
      test('renders the pastDayInfo component', () => {
        const wrapper = shallow(<PastDayInfo />);
        const component = wrapper.dive();
  
        expect(toJson(component)).toMatchSnapshot();
      });
    });
  });