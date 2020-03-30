import React  from "react";
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
import Button from "../Button/Button";
import InputField from "../InputField/InputField";

export default (props) => {
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
            <div className="Form-Body">
                {props.fields.map((input) => {
                    const formFieldClass = cn('Form', 'Field');
                    const mod = input.topSpace ? {verticalSpace: 'xs'} : null;

                    return (
                        <div key={input.id} className={formFieldClass(mod)}>
                            <InputField valueChanged={input.setValue} {...input}/>
                        </div>
                    )
                })}
                {props.result ? (
                    <div className={cn('Form', 'Field')()}>{props.result}</div>
                ) : null}
            </div>
            <div className={FormFooterClass}>
                <Button disabled={!props.valid || props.disableButtons} role="submit" responsive large primary text="Save" mix={cn(FormBlockClass, 'Button')()}/>
                <Button disabled={props.disableButtons} role="reset" responsive large text="Cancel" mix={cn(FormBlockClass, 'Button')()}/>
            </div>
        </form>
    );
}