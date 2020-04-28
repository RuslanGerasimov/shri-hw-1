import React from "react";
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Layout-Footer.css';

export interface LayoutFooterProps {
    mix?: string,
}

const LayoutFooter: React.FC<LayoutFooterProps> = (props) => {
    const mixedClass = props.mix;
    const cmpClass = classnames(cn('Layout', 'Footer')(), mixedClass);

    return (
        <div className={cmpClass}>
            {props.children}
        </div>
    );
};

export default LayoutFooter;