import * as types from './sound_types';
import _ from 'lodash';
import {Howler} from 'howler';

const initial_state = {
    volume: 1,
    muted: false,
};

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case types.TOGGLE_MUTE:
            let newMutedState = !state.muted;
            Howler.mute(newMutedState);
            return {...state, ...{
                muted: newMutedState
            }};
        default:
            return state;
    }
};

export default reducer;
