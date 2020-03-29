import React from "react";
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Layout.css';
import './Layout-Header.css';

export default (props) => {
    const mixedClass = props.mix;
    const layoutClass = classnames(cn('Layout')(), mixedClass);

    return (
        <div className={layoutClass}>
            {props.children}
        </div>
    );
}