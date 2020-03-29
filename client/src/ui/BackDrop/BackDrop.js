import React from "react";
import {cn} from "@bem-react/classname";
import './BackDrop.css';

export default (props) => {
    const backDropClass = cn('BackDrop');

    return(
        <div onClick={props.clicked} className={backDropClass()}>
            {props.children}
        </div>
    );
}