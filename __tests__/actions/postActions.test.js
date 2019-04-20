import configureStore from 'redux-mock-store';

// Actions to be tested
import * as selectActions from './../../src/Actions/postActions';

const mockStore = configureStore();
const store = mockStore();

describe('select_actions', () => {
    beforeEach(() => { 
      store.clearActions();
    });
});    

describe('selectAvatar', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          'payload': 1,
          'type': 'select_avatar',
        },
      ];
  
      store.dispatch(selectActions.selectAvatar(1));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('selectAvatar', () => {
    test('Dispatches the correct action and payload', () => {
      store.dispatch(selectActions.selectAvatar(1));
      expect(store.getActions()).toMatchSnapshot();
    });
  });