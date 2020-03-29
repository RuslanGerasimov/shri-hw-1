import { SET_SETTINGS, GET_SETTINGS } from './actionTypes';



export const fetchSettings = (resolve) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: GET_SETTINGS,
                payload: {
                    repo: 'user/asd',
                    mainBranch: 'master',
                    command: 'npm run build',
                    interval: 20
                }
            });
            resolve(true);
        }, 1000);
    }
};