import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

// Component to be tested
import Header from './../../src/components/Header';

describe('Header />', () => {
    describe('render()', () => {
      test('renders the Header component', () => {
        const wrapper = shallow(<Header />);
        const component = wrapper.dive();
  
        expect(toJson(component)).toMatchSnapshot();
      });
    });
  });