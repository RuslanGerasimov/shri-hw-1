import React from "react";
import {cn} from "@bem-react/classname";

import './Modal.css';

const Modal: React.FC<{ children: React.ReactNode }> = (props) => {
    const modalClass = cn('Modal');

    return (
        <div className={modalClass()}>
            {props.children}
        </div>
    );
};

export default Modal;