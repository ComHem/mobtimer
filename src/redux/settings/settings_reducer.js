import * as types from './settings_types';

const initial_state = {
    sessionLength: 10,
    breakInterval: 4,
    strings: {
        sessionLength: 'Length of each turn (min)',
        breakInterval: 'Break every (n) round',
    }
};

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case types.UPDATE_SETTINGS:
            return {...state, ...action.settings};
        case types.SET_SETTINGS:
            return {...initial_state, ...action.settings};
        default:
            return state;
    }
};

export default reducer;
