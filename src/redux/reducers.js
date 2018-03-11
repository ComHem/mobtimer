import { combineReducers } from 'redux';
import user from './user/user_reducer';
import settings from './settings/settings_reducer';

const reducers = combineReducers({
    user,
    settings,
});

export default reducers;
