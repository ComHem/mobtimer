import * as types from './time_types';

const initial_state = {
    secondsLeft: 2,
    breaking: false,
    running: false,
};

const reducer = (state = initial_state, action) => {
    switch(action.type) {
        case types.SET_SECONDS_LEFT: {
            return { ...state, ...{ secondsLeft: Math.max(action.secondsLeft, 0) }};
        }
        case types.DECREMENT_SECONDS: {
            return { ...state, ...{ secondsLeft: Math.max(state.secondsLeft - 1, 0) }};
        }
        case types.SET_BREAKING: {
            return { ...state, ...{ breaking: action.breaking }};
        }
        case types.SET_RUNNING: {
            return { ...state, ...{ running: action.running }};
        }
        default:
            return state;
    }
};

export default reducer;
