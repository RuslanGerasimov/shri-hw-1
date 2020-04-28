import React from "react";
import {cn} from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Layout-Content.css';
import './Layout-Content_centered.css';
import './Layout-Content_mobileFull.css';


export interface LayoutContentProps {
    mix?: string,
    centered?: boolean,
    mobileFull?: boolean,
    top?: string,
    noSpace?: string,
}

interface modificators extends Record<any, any> {
    centered: boolean,
    mobileFull: boolean,
    top: string,
    noSpace?: string,
}

const LayoutContent: React.FC<LayoutContentProps> = (props) => {
    const mixedClass = props.mix;
    const mainClass = cn('Layout', 'Content');

    const modificators: modificators = {
        centered: !!props.centered,
        mobileFull: !!props.mobileFull,
        top: props.top ? props.top : '',
    };

    if(props.noSpace) {
        modificators.noSpace = props.noSpace;
    }

    if(props.top) {
        modificators.top = props.top;
    }

    const cmpClass = classnames(mainClass(modificators), mixedClass);

    return (
        <div className={cmpClass}>
            {props.children}
        </div>
    );
};

export  default LayoutContent;