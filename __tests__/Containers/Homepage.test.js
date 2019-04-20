import { Avatar } from 'react-native-elements';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Container to be tested
import Homepage from './../../src/Containers/Homepage';

const mockStore = configureStore();
const initialState = {
  selectReducer: {
    selectedAvatar: 0,
  },
  avatars: [
    {
      name: 'Green Gator',
      image: 'https://cdn.alligator.io/images/avatars/green-gator.jpg',
    },
    {
      name: 'Yellow Gator',
      image: 'https://cdn.alligator.io/images/avatars/yellow-gator.jpg',
    },
    {
      name: 'Blue Gator',
      image: 'https://cdn.alligator.io/images/avatars/blue-gator.jpg',
    },
  ],
};
const store = mockStore(initialState);

describe('<Homepage />', () => {
  test('dispatches event to show the avatar selection list', () => {
    const wrapper = shallow(<Homepage store={store} />);
    const component = wrapper.dive();

    component.find(Avatar).props().onPress();

    expect(store.getActions()).toMatchSnapshot();
  });

  describe('render()', () => {
    test('renders the Homepage component', () => {
      const wrapper = shallow(<Homepage />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});