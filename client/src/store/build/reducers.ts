import {SET_BUILD} from './actionTypes';
import {Build, BuildStatues} from "../builds/types";

const initialState: Build = {
    status: BuildStatues.New,
    start: '',
    duration: 0,
    commitMessage: '',
    commitHash: '',
    branchName: '',
    id: '',
    authorName: '',
    buildNumber: 0
};

export default (state: Build = initialState, {type, payload}: {type: string, payload: Build}) => {
    if (type === SET_BUILD) {
        return {
            ...state,
            ...payload
        }
    }

    return state;
}