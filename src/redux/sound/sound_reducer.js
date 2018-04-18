import * as types from './sound_types';
import {Howler} from 'howler';

const title = "Mob timer";
const initial_state = {
    volume: 1,
    muted: true,
};

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case types.TOGGLE_MUTE:
            let newMutedState = !state.muted;
            Howler.mute(newMutedState);

            document.title = newMutedState ? `${title} - MUTED` : title;
            return {...state, ...{
                muted: newMutedState
            }};
        default:
            return state;
    }
};

export default reducer;
