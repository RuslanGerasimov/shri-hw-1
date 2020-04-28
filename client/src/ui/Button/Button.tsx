import React from "react";
import {useHistory} from "react-router-dom";
import {cn} from "@bem-react/classname";
import {classnames} from "@bem-react/classnames";

import './Button.css';
import './Button-Icon.css';
import './Button-Icon_type_play.css';
import './Button-Icon_type_rebuild.css';
import './Button-Icon_type_settings.css';
import './Button-Text.css';
import './Button_large.css';
import './Button_primary.css';
import './Button_responsive.css';

export enum buttonTypes {
    reset = 'reset',
    button = 'button',
    submit = 'submit'
}

export interface ButtonProps {
    large?: boolean,
    primary?: boolean,
    responsive?: boolean,
    text?: string,
    type?: string,
    link?: string,
    clicked?: () => void,
    mix?: string,
    disabled?: boolean,
    role?: buttonTypes
}

const Button: React.FC<ButtonProps> = (props) => {
    const history = useHistory();
    const buttonClass = cn('Button');
    const buttonClassName = buttonClass({
        large: !!props.large,
        primary: !!props.primary,
        responsive: !!props.responsive
    });

    const ButtonText = cn('Button', 'Text');
    const text = props.text ? <span className={ButtonText()}>{props.text}</span> : null;

    const ButtonIcon = cn('Button', 'Icon');
    const icon = props.type ? <span className={ButtonIcon({type: props.type})}/> : null;
    let onClickHandler;
    if(props.link) {
        // @ts-ignore
        onClickHandler = () => { history.push(props.link) };
    } else {
        onClickHandler = props.clicked;
    }

    return (
        <button onClick={onClickHandler}
                disabled={props.disabled} type={props.role} className={classnames(buttonClassName, props.mix)}>
            {icon}
            {text}
        </button>
    );
};

export default Button;