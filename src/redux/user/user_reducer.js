import * as types from './user_types';

const initial_state = {
    rotation: 0,
    users: {},
};

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case types.ADD_USER: {
            const name = action.user && action.user.name;
            const userList = state.users;
            if (name && name !== types.CONST__NEW_USER_NAME && userList && !userList[name]) {
                const current = state.current || name;
                return {...state, ...{
                    current,
                        users: {
                            ...userList,
                            ...{[name]: action.user}
                        }
                }}
            }
            return state;
        }
        case types.REMOVE_USER: {
            const users = {...state.users};
            delete users[action.name];
            return {...state, ...{
                users: users
            }};
        }
        case types.TOGGLE_USER_SLEEPING: {
            const name = action.name;
            const users = {...state.users};
            if (name && users[name]) {
                users[name].sleeping = !users[name].sleeping;
            }
            return {...state, ...{
                users: users
            }}
        }
        case types.SET_BREAKING: {
            return {...state, ...{breaking: action.breaking}}
        }
        case types.NEXT_USER: {
            const activeUsers = Object.values(state.users)
                .filter((user) => !user.sleeping)
                .map(user => user.name);
            const nextIndex = ( activeUsers.indexOf(state.current) + 1 ) % activeUsers.length;
            const nextUser = activeUsers[nextIndex];
            const hasBeenUsedToday = state.activeDate && state.activeDate === new Date().getDate();

            let rotation = nextIndex === 0 ? (state.rotation + 1) : state.rotation;

            if (!hasBeenUsedToday) {
                rotation = 0;
            }

            let breaking = false;
            if (action.breakInterval && state.rotation !== rotation) {
                console.log(state);
                if (state.rotation > 0) {
                    breaking = (state.rotation % action.breakInterval) === 0;
                }
            }

            return {...state, ...{current: nextUser, rotation, breaking, activeDate: new Date().getDate()}}
        }
        default:
            return state;
    }
};

export default reducer;
