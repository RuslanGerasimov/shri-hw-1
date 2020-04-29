import { APP_INIT } from './actionTypes';

const initialState: { appInitialized: boolean } = {
    appInitialized: false
};

export default (state = initialState, { type }: { type: string }) => {
    if(type === APP_INIT) {
        return {
            ...state,
            appInitialized: true
        }
    }

    return  state;
}