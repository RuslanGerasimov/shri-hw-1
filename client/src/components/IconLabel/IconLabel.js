import React from "react";
import {cn} from "@bem-react/classname";
import {classnames} from "@bem-react/classnames";

import './IconLabel.css';
import './IconLabel_large.css';
import './IconLabel_out.css';
import './IconLabel_type.css';

export default (props) => {
    const iconClass = cn('IconLabel')({
        large: !!props.large,
        out: !!props.out,
        type: props.type
    });
    return (
        <div className={classnames(iconClass, props.mix)}>{props.children}</div>
    )
}