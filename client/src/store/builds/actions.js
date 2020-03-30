import { SET_BUILDS } from './actionTypes';
import apiAxiosInstance from "../../services/axios";

export const fetchBuilds = () => {
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