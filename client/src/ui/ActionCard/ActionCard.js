import React, { Fragment } from "react";
import {cn} from "@bem-react/classname";

import './ActionCard.css';
import './ActionCard-Button.css';
import './ActionCard-Description.css';
import './ActionCard-Image.css';


export default (props) => {
    const blockClass = cn('ActionCard');
    const imageClass = cn(blockClass(), 'Image');
    const descClass = cn(blockClass(), 'Description');
    const buttonClass = cn(blockClass(), 'Button');

    return (
        <div className={blockClass()}>
            <div className={imageClass()} />
            <div className={descClass()}>
                {props.description ? props.description
                    : <Fragment>Configure repository connection<br/> and synchronization settings</Fragment>}
            </div>
            {props.button ? (<div className={buttonClass()}>
                {props.button}
            </div>) : null}
        </div>
    );
}