import { SET_BUILDS } from './actionTypes';
import apiAxiosInstance from "../../services/axios";
import { ThunkAction} from 'redux-thunk';

export const fetchBuilds = (): ThunkAction<void, any, unknown, any> => {
    return (dispatch) => {
        apiAxiosInstance.get('/builds')
            .then(({data: builds}) => {
                dispatch({
                    type: SET_BUILDS,
                    payload: {
                        builds: builds
                    }
                });
            }).catch((error) => {
                console.log(error);
            })
    }
};