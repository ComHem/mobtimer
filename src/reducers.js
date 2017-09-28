import { combineReducers } from 'redux';
import user from './user_reducer';
import time from './time_reducer';
import settings from './settings_reducer';

const reducers = combineReducers({
    user,
    time,
    settings,
});

export default reducers;
