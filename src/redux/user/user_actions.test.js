import configureStore from 'redux-mock-store'
import {addUser, removeUser, toggleUserSleeping, nextUser, setBreaking} from './user_actions';

const mockStore = configureStore();

describe('user_actions', () => {
    const initialState = {};
    let store;

    beforeEach(() =>  {
        store = mockStore(initialState);
    });

    it('unusable test', () => {
        expect(false).toEqual(false)
    });
});
