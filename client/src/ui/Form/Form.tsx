import React from "react";
import {cn} from "@bem-react/classname";

import './Form.css';
import './Form-Body.css';
import './Form-Button.css';
import './Form-Field.css';
import './Form-Field_verticalSpace_xs.css';
import './Form-Footer.css';
import './Form-Header.css';
import './Form-HeaderItem.css';
import './Form-HeaderItem_title.css';
import Button, {buttonTypes} from "../Button/Button";
import InputField from "../InputField/InputField";
import {Input, InputWithValueChanged} from "../../components/SettingsForm/SettingsForm";

export interface FormProps {
    submitHandler: React.FormEventHandler,
    resetHandler: React.FormEventHandler,
    title: string,
    description?: string,
    result?: string,
    fields: Array<InputWithValueChanged>,
    disableButtons: boolean,
    valid: boolean,
    submitText?: string
}

const Form: React.FC<FormProps> = (props) => {
    const FormBlockClass = cn('Form')();
    const FormHeaderClass = cn(FormBlockClass, 'Header')();
    const FormHeaderItemClass = cn(FormBlockClass, 'HeaderItem');
    const FormFooterClass = cn(FormBlockClass, 'Footer')();

    return (
        <form onSubmit={props.submitHandler} onReset={props.resetHandler} className={FormBlockClass}>
            <div className={FormHeaderClass}>
                <div className={FormHeaderItemClass({title: true})}>{props.title}</div>
                <div className={FormHeaderItemClass()}>{props.description}</div>
            </div>
            {props.result ? (
                <div className={cn('Form', 'Result')()}>{props.result}</div>
            ) : null}
            <div className="Form-Body">
                {props.fields.map((input) => {
                    const formFieldClass = cn('Form', 'Field');
                    const mod = input.topSpace ? {verticalSpace: 'xs'} : null;

                    return (
                        <div key={input.id} className={formFieldClass(mod)}>
                            <InputField valueChanged={input.valueChanged} {...input}/>
                        </div>
                    )
                })}
            </div>
            <div className={FormFooterClass}>
                <Button disabled={!props.valid || props.disableButtons} role={buttonTypes.submit}
                        responsive
                        large
                        primary
                        text={props.submitText ? props.submitText : 'Save'}
                        mix={cn(FormBlockClass, 'Button')()}/>
                <Button disabled={props.disableButtons} role={buttonTypes.reset} responsive large text="Cancel" mix={cn(FormBlockClass, 'Button')()}/>
            </div>
        </form>
    );
};

export default Form;