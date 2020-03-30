import { SET_BUILDS } from './actionTypes';

const initialState = {
    builds: []
};

export default (state = initialState, { type, payload }) => {
    if(type === SET_BUILDS) {
        return {
            ...state,
            builds: payload.builds
        }
    }

    return  state;
}