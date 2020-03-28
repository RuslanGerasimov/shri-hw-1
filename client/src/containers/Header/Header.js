import React from "react";
import { cn } from '@bem-react/classname';
import { classnames } from '@bem-react/classnames';

import './Header.css';
import './Header-Buttons.css';
import './Header-Button.css';
import './Header-Title.css';
import './Header-Title_logo.css';


export default (props) => {
    const headerClass = cn('Header');
    const headerTitleClass = cn('Header', 'Title');
    const headerButtonsClass = cn('Header', 'Buttons');
    const headerButtonClass = cn('Header', 'Button');

    const headerButtons = props.buttons ? (
        <div className={headerButtonsClass()}>
            {props.buttons.map((button) => React.cloneElement(button, {mix: headerButtonClass()}))}
        </div>
    ) : null;

    const resultedBlockClass = classnames(headerClass(), props.mix);

    return (
        <div className={resultedBlockClass}>
            <div className={headerTitleClass({logo: props.title.type === 'logo'})}>
                {props.title.text}
            </div>
            {headerButtons}
        </div>
    );
}