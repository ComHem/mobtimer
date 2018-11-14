import * as types from './user_types';

export const addUser = (user) => ({type: types.ADD_USER, user});
export const removeUser = (user) => ({type: types.REMOVE_USER, user});
export const toggleUserSleeping = (user) => ({type: types.TOGGLE_USER_SLEEPING, user});
export const nextUser = (breakInterval) => ({type: types.NEXT_USER, breakInterval});

export const setBreaking = (breaking) => ({type: types.SET_BREAKING, breaking});
