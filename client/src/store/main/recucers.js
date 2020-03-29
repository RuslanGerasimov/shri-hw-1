import { APP_INIT } from './actionTypes';

const initialState = {
    appInitialized: false
};

export default (state = initialState, { type, payload }) => {
    if(type === APP_INIT) {
        return {
            ...state,
            appInitialized: true
        }
    }

    return  state;
}