import React from "react";
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Layout-Wrapper.css';

interface LayoutWrapperProps {
    mix?: string
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = (props) => {
    const mixedClass = props.mix ? props.mix : '';
    const cmpClass = classnames(cn('Layout', 'Wrapper')(), mixedClass);
    return (
        <div className={cmpClass}>
            {props.children}
        </div>
    );
};

export  default LayoutWrapper;