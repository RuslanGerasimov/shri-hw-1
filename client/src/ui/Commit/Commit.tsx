import React, {ReactText} from "react";
import {cn} from "@bem-react/classname";

import "./Commit.css";
import "./Commit_detail.css";
import "./Commit-CommitId.css";
import "./Commit-Content.css";
import "./Commit-ContentRow.css";
import "./Commit-DateTime.css";
import "./Commit-DateTimeBox.css";
import "./Commit-Item.css";
import "./Commit-Item_author.css";
import "./Commit-Item_title.css";
import IconLabel, {IconLabelTypes} from "../../ui/IconLabel/IconLabel";

export interface CommitProps {
    clicked?: React.EventHandler<any>,
    detail?: boolean,
    type: any,
    number: string|number,
    description: string,
    branch: string,
    hex: string,
    author: string,
    date: string,
    interval: string|number
}

const Commit: React.FC<CommitProps> = (props) => {
    const commitClass = cn('Commit');
    const commitContentClass = cn(commitClass(), 'Content');
    const commitContentRowClass = cn(commitClass(), 'ContentRow');
    const commitItemClass = cn(commitClass(), 'Item');
    const commitIdClass = cn(commitClass(), 'CommitId');
    const commitDateBoxClass = cn(commitClass(), 'DateTimeBox');
    const commitDateClass = cn(commitClass(), 'DateTime');

    return (
        <div onClick={props.clicked} className={commitClass({detail: !!props.detail})}>
            <div className={commitContentClass()}>
                <div className={commitContentRowClass()}>
                    <IconLabel mix={commitItemClass()} large out type={props.type}>#{props.number}</IconLabel>
                    <div className={commitItemClass({title: true})}>{props.description}</div>
                </div>
                <div className={commitContentRowClass()}>
                    <div className={commitItemClass()}>
                        <IconLabel type={IconLabelTypes.branch}>{props.branch}</IconLabel>
                        <div className={commitIdClass()}>{props.hex ? props.hex.substring(0, 5): null}</div>
                    </div>
                    <IconLabel type={IconLabelTypes.author} mix={commitItemClass({author: true})}>{props.author}</IconLabel>
                </div>
            </div>
            <div className={commitDateBoxClass()}>
                <IconLabel type={IconLabelTypes.date} mix={commitDateClass()}>{props.date}</IconLabel>
                <IconLabel type={IconLabelTypes.timeInterval} mix={commitDateClass({interval: true})}>
                    {props.interval}
                </IconLabel>
            </div>
        </div>
    );
};

export default Commit;