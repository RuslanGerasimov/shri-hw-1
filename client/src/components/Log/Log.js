import React from "react";
import {cn} from "@bem-react/classname";

import "./Log.css";

export default (props) => {
    return (
        <div className={cn('Log')()}>
            {props.children}
        </div>
    )
}