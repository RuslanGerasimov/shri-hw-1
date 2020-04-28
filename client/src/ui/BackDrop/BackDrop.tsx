import React from "react";
import {cn} from "@bem-react/classname";
import './BackDrop.css';

const BackDrop: React.FC<{clicked: React.EventHandler<any> }> =  (props) => {
    const backDropClass = cn('BackDrop');

    return(
        <div onClick={props.clicked} className={backDropClass()}>
            {props.children}
        </div>
    );
};

export default BackDrop;