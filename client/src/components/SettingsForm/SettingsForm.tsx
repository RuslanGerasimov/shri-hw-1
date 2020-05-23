import React, {useState} from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

export interface InputWithValueChanged extends Input{
    valueChanged: (val: string) => void
}

type Validator = (val: string) => boolean;

const SettingsForm: React.FC<SettingsFormProps> = (props) => {
    const {t, i18n} = useTranslation();
    const [formState, setFormState] = useState({ requestIsProcessing: false, success: false, processed: false });

    const inputInitial = [
        {
            label: t('settings.form.repo'),
            placeholder: t('settings.form.repoPlaceholder'),
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
            label: t('settings.form.command'),
            placeholder: t('settings.form.commandPlaceholder'),
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
            label: t('settings.form.branch'),
            placeholder: t('settings.form.branchPlaceholder'),
            value: props.mainBranch,
            showClear: true,
            compulsory: false,
            type: 'text',
            id: 'mainBranch',
            error: useState(false)
        },
        {
            label: t('settings.form.period'),
            placeholder: t('settings.form.periodPlaceholder'),
            value: props.interval,
            showClear: false,
            compulsory: false,
            type: 'text',
            inline: true,
            unit: i18n.t('settings.form.periodUnits', {count: +props.interval}),
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

    const changeValue: (input: Input) => InputWithValueChanged = (input: Input) => {
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

            const settingsData: Settings = {
                repo: props.repo,
                command: props.command,
                mainBranch: props.mainBranch,
                interval: props.interval
            };

            props.saveSettings(settingsData).then(() => {
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
        <Form valid={!formIsInValid} title={t('settings.form.title')}
              result={formState.processed ?
                  (formState.success ? t('settings.form.messages.success') : t('settings.form.messages.error')) : undefined}
              disableButtons={props.processIsGoing}
              submitHandler={submitForm}
              resetHandler={resetForm}
              description={t('settings.form.description')}
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