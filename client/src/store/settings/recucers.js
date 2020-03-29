import {SET_SETTINGS, GET_SETTINGS} from './actionTypes';

const initialState = {
    repo: '',
    mainBranch: '',
    command: '',
    interval: ''
};

export default (state = initialState, { type, payload }) => {
    if(type === GET_SETTINGS) {
        return {
            ...state,
            repo: payload.repo,
            mainBranch: payload.mainBranch,
            command: payload.command,
            interval: payload.interval
        }
    }

    return  state;
}