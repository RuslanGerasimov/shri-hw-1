import { GET_SETTINGS, SET_SETTING, SETTINGS_API_GOING} from './actionTypes';
import { SettingsState } from './type';

const initialState: SettingsState = {
    id: '',
    repo: '',
    mainBranch: '',
    command: '',
    interval: '',
    processIsGoing: false
};

export default (state: SettingsState = initialState, { type, payload }: {type: string, payload: any}) => {
    if(type === GET_SETTINGS) {
        return {
            ...state,
            id: payload.id,
            repo: payload.repo,
            mainBranch: payload.mainBranch,
            command: payload.command,
            interval: payload.interval
        }
    } else if(type === SET_SETTING) {
        return  {
            ...state,
            [payload.type]: payload.value
        }
    } else if(type === SETTINGS_API_GOING) {
        return  {
            ...state,
            processIsGoing: payload.value
        }
    }

    return  state;
}