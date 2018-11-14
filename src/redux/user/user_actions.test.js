import configureStore from 'redux-mock-store'

const mockStore = configureStore();

describe('user_actions', () => {
    const initialState = {};
    let store;

    beforeEach(() =>  {
        store = mockStore(initialState);
    });

    it('unusable test', () => {
        expect(true).toBe(true);
    });
});
