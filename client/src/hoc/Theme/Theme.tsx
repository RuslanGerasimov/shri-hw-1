import React from 'react';
import { cn } from '@bem-react/classname';

import "./Theme.css"
import "./Theme_default.css"

export interface ThemeProps {
    default?: boolean
}

const Theme: React.FC<ThemeProps> = (props) => {
    const theme = cn('Theme');

    return (
        <div className={theme({default: !!props.default})}>
            {props.children}
        </div>
    );
};

export default Theme;