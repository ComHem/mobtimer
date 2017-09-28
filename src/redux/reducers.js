import { combineReducers } from 'redux';
import user from './user/user_reducer';
import time from './time/time_reducer';
import settings from './settings/settings_reducer';

const reducers = combineReducers({
    user,
    time,
    settings,
});

export default reducers;
