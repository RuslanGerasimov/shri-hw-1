import React, {useState} from "react";
import {cn} from "@bem-react/classname";

import './InputField.css';
import './InputField_compulsory.css';
import './InputField_inline.css';
import './InputField-Input.css';
import './InputField-ClearIcon.css';
import './InputField-InputBox.css';
import './InputField-InputBox_clearIcon.css';
import './InputField-Label.css';

export default (props) => {
    const [value, setValue] = useState(props.value ? props.value : '');
    const valueChanged = (value) => {
        setValue(value);
    };

    const inputFieldClass = cn('InputField');
    const inputFieldLabelClass = cn(inputFieldClass(), 'Label')();
    const inputBoxClass = cn(inputFieldClass(), 'InputBox');
    const inputElementFieldClass = cn(inputFieldClass(), 'Input');

    const inputFulfilled = value ? value.length > 0 : false;
    return (
        <div className={inputFieldClass({compulsory: !!props.compulsory, inline: !!props.inline})}>
            <label htmlFor={props.id} className={inputFieldLabelClass}>{props.label}</label>
            <div className={inputBoxClass({clearIcon: inputFulfilled && props.showClear})}>
                <input id={props.id} type="text"
                       onChange={(ev) => { valueChanged(ev.target.value) }}
                       value={value} className={inputElementFieldClass({fulfilled: inputFulfilled})}
                       placeholder={props.placeholder} />
                {props.showClear ? <div onClick={valueChanged.bind(null, '')} className={cn(inputFieldClass(), 'ClearIcon')()} /> : null}
            </div>
            {props.unit ? <div className={cn(inputFieldClass(), 'Unit')()}>{props.unit}</div> : null}
        </div>
    );
}