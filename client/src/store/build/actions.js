import { SET_BUILD } from './actionTypes';
import apiAxiosInstance from "../../services/axios";

export const fetchBuild = (buildId) => {
    return (dispatch) => {
        apiAxiosInstance.get('/builds/' + buildId)
            .then(({data: build}) => {
                dispatch({
                    type: SET_BUILD,
                    payload: build
                });
            }).catch((error) => {
                console.log(error);
            })
    }
};