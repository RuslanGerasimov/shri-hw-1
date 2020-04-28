import React from "react";
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Layout-Header.css';

interface LayoutHeaderProps {
    mix: string,
    children: React.Component
}

const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
    const mixedClass = props.mix;
    const cmpClass = classnames(cn('Layout', 'Header')(), mixedClass);

    return (
        <div className={cmpClass}>
            {props.children}
        </div>
    );
};

export  default LayoutHeader;