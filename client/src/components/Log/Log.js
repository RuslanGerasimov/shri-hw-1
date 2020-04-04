import React from "react";
import {cn} from "@bem-react/classname";
import Ansi from 'ansi-to-react';


import "./Log.css";

export default (props) => {
    return (
        <div  className={cn('Log')()} >
            <Ansi>
                {props.children}
            </Ansi>
        </div>
    )
}