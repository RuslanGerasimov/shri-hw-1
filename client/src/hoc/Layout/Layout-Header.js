import React from "react";
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Layout-Header.css';

export  default (props) => {
    const mixedClass = props.mix;
    const cmpClass = classnames(cn('Layout', 'Header')(), mixedClass);

    return (
        <div className={cmpClass}>
            {props.children}
        </div>
    );
}