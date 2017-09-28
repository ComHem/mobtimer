import * as types from './settings_types';
const initial_state = {
    sessionLength: 600,
    breakInterval: 1,
    breakTime: 5,
};

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case types.UPDATE_SETTINGS:
            return {...state, ...action.settings}
            break;
        case types.SET_SETTINGS:
            return {...initial_state, ...action.settings}
        default:
            return state;
    }
};

export default reducer;
