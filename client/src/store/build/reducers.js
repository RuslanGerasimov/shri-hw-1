import { SET_BUILD } from './actionTypes';

const initialState = {
    status: null,
    start: null,
    duration: null,
    commitMessage: '',
    commitHash: '',
    branchName: null,
    id: null,
    authorName: null
};

export default (state = initialState, { type, payload }) => {
    if(type === SET_BUILD) {
        return {
            ...state,
            ...payload
        }
    }

    return  state;
}