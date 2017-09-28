import * as types from './time_types';

export const setSecondsLeft = (secondsLeft) => ({ type: types.SET_SECONDS_LEFT, secondsLeft });
export const decrementSeconds = () => ({ type: types.DECREMENT_SECONDS });
export const setBreaking = (breaking) => ({ type: types.SET_BREAKING, breaking });
export const setRunning = (running) => ({ type: types.SET_RUNNING, running });
