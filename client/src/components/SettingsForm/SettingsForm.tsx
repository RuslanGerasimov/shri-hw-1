import React, {useState} from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as actions from '../../store/settings/actions';

import Form from "../../ui/Form/Form";
import compulsory from "../../ui/Form/validators/compulsory";
import numbersOnly from "../../ui/Form/validators/numbersOnly";
import {Settings, SettingsState} from "../../store/settings/type";
import {ThunkDispatch} from "redux-thunk";

export interface SettingsFormProps extends SettingsState {
    setValue: (id: string, value: string) => void,
    setProcessIsGoing: (isGoing: boolean) => void,
    saveSettings: (data: Settings) => Promise<any>,
    fetchSettings: (resolve: () => void, reject: () => void) => void
}

export interface Input {
    validators?: Array<Validator>,
    setError: (isValid: boolean) => void,
    id: string,
    label: string,
    placeholder: string,
    value: string,
    showClear: boolean,
    compulsory: boolean,
    type: string,
    inline?: boolean,
    unit?: string,
    topSpace?: boolean,
    error: boolean,
    valueChanged?: (val: string) => void
}

type Validator = (val: string) => boolean;

const SettingsForm: React.FC<SettingsFormProps> = (props) => {
    const [formState, setFormState] = useState({ requestIsProcessing: false, success: false, processed: false });

    const inputInitial = [
        {
            label: "GitHub repository",
            placeholder: "user-name/repo-name",
            showClear: true,
            compulsory: true,
            type: 'text',
            id: 'repo',
            error: useState(false),
            value: props.repo,
            validators : [
                compulsory
            ]
        },
        {
            label: "Build command",
            placeholder: "enter command to run",
            value: props.command,
            showClear: true,
            compulsory: true,
            type: 'text',
            id: 'command',
            error: useState(false),
            validators : [
                compulsory
            ]
        },
        {
            label: "Main branch",
            placeholder: "master",
            value: props.mainBranch,
            showClear: true,
            compulsory: false,
            type: 'text',
            id: 'mainBranch',
            error: useState(false)
        },
        {
            label: "Synchronize every",
            placeholder: "10",
            value: props.interval,
            showClear: false,
            compulsory: false,
            type: 'text',
            inline: true,
            unit: 'minutes',
            topSpace: true,
            id: 'interval',
            error: useState(false),
            validators : [
                numbersOnly
            ]
        },
    ].map((input) => {
        return {
            ...input,
            error: input.error[0],
            setError: input.error[1],
        }
    });

    const history = useHistory();

    const changeValue: (input: Input) => Input = (input: Input) => {
        return {
            ...input,
            valueChanged: (value: string) => {
                const isValid = input.validators ? validateInput(input.validators, value) : true;
                props.setValue(input.id, value);
                input.setError(!isValid);
            }
        }
    };

    const inputs = inputInitial.map(changeValue);

    const validateInput = (validators: Array<(val: string) => boolean>, value: string) => {
        let result = true;
        if(validators && Array.isArray(validators)) {
            validators.forEach((validationFunc) => {
                const isValid = validationFunc(value);
                if(!isValid) {
                    result = false;
                }
            })
        }
        return result;
    };

    const submitForm = (ev: React.FormEvent) => {
        ev.preventDefault();
        const formIsaValid = inputs.reduce((res: boolean, input: Input) => {
            const isValid = input.validators ? validateInput(input.validators, input.value) : true;
            input.setError(!isValid);
            return isValid && res;
        }, true);
        if(formIsaValid) {
            props.setProcessIsGoing(true);
            setFormState({
                ...formState,
                requestIsProcessing: true
            });

            props.saveSettings({
                repo: props.repo,
                command: props.command,
                mainBranch: props.mainBranch,
                interval: props.interval
            }).then(() => {
                setFormState({
                    processed: true,
                    success: true,
                    requestIsProcessing: false
                });
                props.setProcessIsGoing(false);
            }).catch(() => {
                setFormState({
                    processed: true,
                    success: false,
                    requestIsProcessing: false
                });
                props.setProcessIsGoing(false);
            });
        }
    };

    const formIsInValid = inputs.reduce((res: boolean, input: Input) => input.error || res, false);
    const resetForm = () => {
        new Promise((resolve, reject) => {
            props.fetchSettings(resolve, reject);
        }).catch((res) => {
            console.log(res);
        });
        history.goBack();
    };

    return (
        <Form valid={!formIsInValid} title="Settings"
              result={formState.processed ?
                  (formState.success ? "Репозитроий клонирован успешно" : "Ошибка при клонировании репозитория") : null}
              disableButtons={props.processIsGoing}
              submitHandler={submitForm}
              resetHandler={resetForm}
              description="Configure repository connection and synchronization settings."
              fields={inputs}/>
    )
};

const mapsDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        fetchSettings: (resolve: () => void, reject: () => void) => { dispatch(actions.fetchSettings(resolve, reject)) },
        saveSettings: (data: Settings) => { return new Promise((resolve, reject) => {
            dispatch(actions.saveSettings(data, resolve, reject));
        }); },
        setValue: (type: string, value: string) => {dispatch(actions.setSetting(type, value))},
        setProcessIsGoing: (isGoing: boolean) => {dispatch(actions.setProcessIsGoing(isGoing))},
    }
};


const mapStateToProps = (state: {settings: SettingsState}) => {
    return {
        repo: state.settings.repo,
        mainBranch: state.settings.mainBranch,
        command: state.settings.command,
        interval: state.settings.interval,
        processIsGoing: state.settings.processIsGoing
    }
};

export default connect(mapStateToProps, mapsDispatchToProps)(SettingsForm);