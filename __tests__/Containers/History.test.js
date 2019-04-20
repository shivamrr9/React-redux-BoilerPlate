import { Avatar } from 'react-native-elements';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Container to be tested
import History from './../../src/Containers/History';

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

describe('<History />', () => {
  test('dispatches event to show the avatar selection list', () => {
    const wrapper = shallow(<History store={store} />);
    const component = wrapper.dive();

    component.find(Avatar).props().onPress();

    expect(store.getActions()).toMatchSnapshot();
  });

  describe('render()', () => {
    test('renders the History component', () => {
      const wrapper = shallow(<History />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});