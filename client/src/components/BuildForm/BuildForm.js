import React, {useState} from "react";
import apiAxiosInstance from "../../services/axios";
import { useHistory } from 'react-router-dom';

import Form from "../../ui/Form/Form";
import compulsory from "../../ui/Form/validators/compulsory";

const BuildForm = (props) => {
    const history = useHistory();
    const [formState, setFormState] = useState({requestIsProcessing: false, success: false, processed: false});
    const [commitHex, setCommitToBuild] = useState('');

    const setProcessIsGoing = (isGoing) => setFormState({
        ...formState,
        requestIsProcessing: !!isGoing
    });
    const setResult = (isSuccess) => {
        setFormState({
            ...formState,
            processed: true,
            success: !!isSuccess
        });
    };


    const inputInitial = [
        {
            label: "Enter the commit hash you want to build",
            placeholder: "Commit hash",
            showClear: true,
            compulsory: true,
            type: 'text',
            id: 'commitHex',
            error: useState(false),
            value: commitHex,
            setValue: setCommitToBuild,
            validators: [
                compulsory
            ]
        }
    ].map((input) => {
        return {
            ...input,
            error: input.error[0],
            setError: input.error[1],
        }
    });


    const inputs = inputInitial.map((input) => {
        return {
            ...input,
            valueChanged: (value) => {
                const isValid = validateInput(input.validators, value);
                input.setValue(value);
                input.setError(!isValid);
            }
        }
    });

    const validateInput = (validators, value) => {
        let result = true;
        if (validators && Array.isArray(validators)) {
            validators.forEach((validationFunc) => {
                const isValid = validationFunc(value);
                if (!isValid) {
                    result = false;
                }
            })
        }
        return result;
    };

    const submitForm = (ev) => {
        ev.preventDefault();
        setProcessIsGoing(true);
        apiAxiosInstance.post('/build/request', { commitHash: commitHex})
            .then((result) => {
                setProcessIsGoing(false);
                setResult(true);
                const id = result.data;
                history.push('/build/' + id);
            }).catch(() => {
                setProcessIsGoing(false);
                setResult(false);
            })
    };

    const formIsInValid = inputs.reduce((res, input) => input.error || res, false);
    return (
        <Form valid={!formIsInValid}
              title="New build"
              result={formState.processed ?
                  (formState.success ? "Билд поставлен в очередь" : "Ошибка при попытке поставить билд а очередь") : null}
              disableButtons={formState.processIsGoing}
              submitHandler={submitForm}
              resetHandler={props.resetHandler}
              sumbitText="Run Build"
              fields={inputs}/>
    )
};

export default BuildForm;