import React from "react";
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Layout.css';
import './Layout-Header.css';

const Layout: React.FC<{ mix?: string }> = (props) => {
    const mixedClass = props.mix ? props.mix : '';
    const layoutClass = classnames(cn('Layout')(), mixedClass);

    return (
        <div className={layoutClass}>
            {props.children}
        </div>
    );
};

export default Layout;