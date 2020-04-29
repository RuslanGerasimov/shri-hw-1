import apiAxiosInstance from "../../services/axios";
import { SET_BUILD } from './actionTypes';
import {ThunkDispatch} from "redux-thunk";
import {Build} from "../builds/types";

export const fetchBuild = (buildId: string) => {
    return (dispatch: ThunkDispatch<{type: string, payload: Build}, any, any>) => {
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