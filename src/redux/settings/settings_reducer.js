import * as types from './settings_types';
const initial_state = {
    sessionLength: 600,
    breakInterval: 1,
    breakTime: 5,
    strings: {
        sessionLength: 'Length of Turn (sec)',
        breakInterval: 'Break every (n) round',
        breakTime: 'Lenght of Breaks (sec)'
    }
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
