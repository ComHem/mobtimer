import * as types from './settings_types';

export const updateSettings = (settings) => ({type: types.UPDATE_SETTINGS, settings});
export const setSettings = (settings) => ({type: types.SET_SETTINGS, settings});
