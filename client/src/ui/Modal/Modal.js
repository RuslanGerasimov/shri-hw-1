import React from "react";
import {cn} from "@bem-react/classname";

import './Modal.css';

export default (props) => {
    const modalClass = cn('Modal');

    return(
        <div className={cn('BackDrop')}>
            <div className={modalClass()}>
                {props.children}
            </div>
        </div>
    );
}