import * as types from './user_types';
import _ from 'lodash';

const initial_state = {
    rotation: 0,
    current: "",
    breaking: false,
    users: [],
};

const setIsBreaktime = (state, options, firstTimeUsingToday) => {
    let breaking = false;
    if (state.breaking) {
        breaking = false;
    }
    if (options.breakInterval &&
        state.rotation !== options.rotation &&
        breaking === false) {
        if (state.rotation > 0 || firstTimeUsingToday) {
            breaking = (state.rotation % options.breakInterval) === 0;
        }
    }

    return breaking;
};

const getUserFromState = (state, user) => {
    return state.users.filter(stateUser => stateUser.name === user.name)[0]
};
const isUserInState = (state, user) => (!!state.users.filter(stateUser => stateUser.name === user.name).length);
const isUserCurrentlyActive = (state, user) => (state.current === getUserFromState(state, user).name);

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case types.ADD_USER: {
            const name = action.user && action.user.name;
            const userList = state.users;

            if (name && !isUserInState(state, action.user)) {
                const current = state.current || name;
                return {
                    ...state,
                    ...{
                        current,
                        users: [...userList, action.user]
                    }
                }
            }
            return state;
        }

        case types.REMOVE_USER: {
            const users = state.users;
            return {
                ...state,
                ...{
                    users: _.without(users, getUserFromState(state, action.user))
                }
            };
        }

        case types.TOGGLE_USER_SLEEPING: {
            const user = action.user;
            const users = state.users;
            let mergedUsers = users;

            if (user && isUserInState(state, user) && !isUserCurrentlyActive(state, user)) {
                const _user = getUserFromState(state, user);
                mergedUsers = users.map(stateUser => {
                    if (stateUser.name === _user.name) {
                        stateUser.sleeping = !stateUser.sleeping;
                    }
                    return stateUser;
                });
            }

            return {
                ...state,
                ...{
                    users: [...mergedUsers]
                }
            }
        }

        case types.NEXT_USER: {
            const activeUsers = Object.values(state.users)
                .filter((user) => !user.sleeping)
                .map(user => user.name);
            const nextUserIndex = (activeUsers.indexOf(state.current) + 1) % activeUsers.length;
            const nextUser = activeUsers[nextUserIndex];
            const firstTimeUsingToday = state.activeDate && state.activeDate !== new Date().getDate();


            let rotation = nextUserIndex === 0 ? (state.rotation + 1) : state.rotation;
            if (firstTimeUsingToday) {
                rotation = 1;
            }

            const breaking = setIsBreaktime(state, {
                breakInterval: action.breakInterval,
                rotation,
            }, firstTimeUsingToday);

            return {
                ...state,
                ...{
                    current: nextUser,
                    rotation,
                    breaking,
                    activeDate: new Date().getDate(),
                }
            }
        }

        case types.SET_BREAKING: {
            return {
                ...state,
                ...{
                    breaking: action.breaking
                }
            }
        }

        default: {
            return state;
        }
    }
};

export default reducer;
