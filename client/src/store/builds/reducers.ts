import { SET_BUILDS } from './actionTypes';
import {Build} from "./types";

const initialState: {builds: Array<Build>} = {
    builds: []
};

export default (state = initialState, { type, payload }: { type: string, payload: { builds: Array<Build> } }) => {
    if(type === SET_BUILDS) {
        return {
            ...state,
            builds: payload.builds
        }
    }

    return  state;
}