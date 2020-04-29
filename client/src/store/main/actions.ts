import {APP_INIT} from './actionTypes';
import * as settingsActions from '../settings/actions';
import {ThunkDispatch} from "redux-thunk";


export const initApp = () => {
    return (dispatch: ThunkDispatch<any, any, any>) => {
        const fetchPromise = new Promise(((resolve, reject) => {
            dispatch(settingsActions.fetchSettings(resolve, reject));
        }));
        fetchPromise.then(() => {
            dispatch({type: APP_INIT});
        }).catch((err) => {
            dispatch({type: APP_INIT});
        })
    }
};