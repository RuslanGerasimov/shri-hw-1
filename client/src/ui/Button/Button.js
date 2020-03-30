import React from "react";
import { useHistory } from "react-router-dom";
import { cn } from "@bem-react/classname";
import { classnames } from "@bem-react/classnames";

import './Button.css';
import './Button-Icon.css';
import './Button-Icon_type_play.css';
import './Button-Icon_type_rebuild.css';
import './Button-Icon_type_settings.css';
import './Button-Text.css';
import './Button_large.css';
import './Button_primary.css';
import './Button_responsive.css';

export default (props) => {
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
    const icon = props.type ? <span className={ButtonIcon({ type: props.type })} /> : null;
    return(
        <button onClick={!props.link ? props.clicked : () => {history.push(props.link)}}
                disabled={props.disabled} type={props.role} className={classnames(buttonClassName, props.mix)}>
            {icon}
            {text}
        </button>
    );
};