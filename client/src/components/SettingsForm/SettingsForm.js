import React, { useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as actions from '../../store/settings/actions';

import Form from "../../ui/Form/Form";
import compulsory from "../../ui/Form/validators/compulsory";
import numbersOnly from "../../ui/Form/validators/numbersOnly";

const SettingsForm = (props) => {
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
    const inputs = inputInitial.map((input) => {
       return {
           ...input,
           valueChanged: (value) => {
               const isValid = validateInput(input.validators, value);
               props.setValue(input.id, value);
               input.setError(!isValid);
           }
       }
    });

    const validateInput = (validators, value) => {
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

    const submitForm = (ev) => {
        ev.preventDefault();
        const formIsaValid = inputs.reduce((res, input) => {
            const isValid = validateInput(input.validators, input.value);
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
                repoName: props.repo,
                buildCommand: props.command,
                mainBranch: props.mainBranch,
                period: props.interval
            }).then((res) => {
                setFormState({
                    processed: true,
                    success: true,
                    requestIsProcessing: false
                });
                props.setProcessIsGoing(false);
            }).catch((err) => {
                setFormState({
                    processed: true,
                    success: false,
                    requestIsProcessing: false
                });
                props.setProcessIsGoing(false);
            });
        }
    };

    const formIsInValid = inputs.reduce((res, input) => input.error || res, false);
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

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchSettings: (resolve, reject) => { dispatch(actions.fetchSettings(resolve, reject)) },
        saveSettings: (data) => { return new Promise((resolve, reject) => {
            dispatch(actions.saveSettings(data, resolve, reject));
        }); },
        setValue: (type, value) => {dispatch(actions.setSetting(type, value))},
        setProcessIsGoing: (isGoing) => {dispatch(actions.setProcessIsGoing(isGoing))},
    }
};

const mapStateToProps = state => {
    return {
        repo: state.settings.repo,
        mainBranch: state.settings.mainBranch,
        command: state.settings.command,
        interval: state.settings.interval,
        processIsGoing: state.settings.processIsGoing
    }
};

export default connect(mapStateToProps, mapsDispatchToProps)(SettingsForm);