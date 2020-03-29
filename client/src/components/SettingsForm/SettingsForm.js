import React, { useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as actions from '../../store/settings/actions';

import Form from "../../ui/Form/Form";
import compulsory from "../../ui/Form/validators/compulsory";
import numbersOnly from "../../ui/Form/validators/numbersOnly";

const SettingsForm = (props) => {
    const inputInitial = [
        {
            label: "GitHub repository",
            placeholder: "user-name/repo-name",
            showClear: true,
            compulsory: true,
            type: 'text',
            id: 'repo',
            error: useState(false),
            value: useState(props.repo),
            validators : [
                compulsory
            ]
        },
        {
            label: "Build command",
            placeholder: "enter command to run",
            value: useState(props.command),
            showClear: true,
            compulsory: true,
            type: 'text',
            id: 'buildCommand',
            error: useState(false),
            validators : [
                compulsory
            ]
        },
        {
            label: "Main branch",
            placeholder: "master",
            value: useState(props.mainBranch),
            showClear: true,
            compulsory: false,
            type: 'text',
            id: 'mainBranch',
            error: useState(false)
        },
        {
            label: "Synchronize every",
            placeholder: "10",
            value: useState(props.interval),
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
            value: input.value[0],
            setValue: input.value[1],
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
               input.setError(!isValid);
               input.setValue(value);
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
        inputs.reduce((res, input) => {
            const isValid = validateInput(input.validators, input.value);
            input.setError(!isValid);
            return isValid && res;
        }, true);
    };

    const formIsInValid = inputs.reduce((res, input) => input.error || res, false);

    return (
        <Form valid={!formIsInValid} title="Settings"
              submitHandler={submitForm}
              resetHandler={() => { history.goBack() }}
              description="Configure repository connection and synchronization settings."
              fields={inputs}/>
    )
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchSettings: () => { dispatch(actions.fetchSettings()) }
    }
};

const mapStateToProps = state => {
    return {
        repo: state.settings.repo,
        mainBranch: state.settings.mainBranch,
        command: state.settings.command,
        interval: state.settings.interval
    }
};

export default connect(mapStateToProps, mapsDispatchToProps)(SettingsForm);