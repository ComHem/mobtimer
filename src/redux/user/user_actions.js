import * as types from './user_types';

export const addUser = (user) => ({type: types.ADD_USER, user});
export const removeUser = (name) => ({type: types.REMOVE_USER, name});
export const toggleUserSleeping = (name) => ({type: types.TOGGLE_USER_SLEEPING, name});
export const nextUser = () => ({type: types.NEXT_USER});
