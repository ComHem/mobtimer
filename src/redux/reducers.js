import { combineReducers } from 'redux';
import user from './user/user_reducer';
import settings from './settings/settings_reducer';
import sound from './sound/sound_reducer';

const reducers = combineReducers({
    user,
    settings,
    sound,
});

export default reducers;
