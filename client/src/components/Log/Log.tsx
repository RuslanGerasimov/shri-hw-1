import React from "react";
import {cn} from "@bem-react/classname";
import Ansi from 'ansi-to-react';


import "./Log.css";

const Log: React.FC<{children: string}> = (props) => {
    return (
        <div  className={cn('Log')()} >
            <Ansi>
                {props.children}
            </Ansi>
        </div>
    )
}

export default Log;