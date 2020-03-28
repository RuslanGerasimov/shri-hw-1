import React from "react";
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
import IconLabel from "../IconLabel/IconLabel";

export default (props) => {
    const commitClass = cn('Commit');
    const commitContentClass = cn(commitClass(), 'Content');
    const commitContentRowClass = cn(commitClass(), 'ContentRow');
    const commitItemClass = cn(commitClass(), 'Item');
    const commitIdClass = cn(commitClass(), 'CommitId');
    const commitDateBoxClass = cn(commitClass(), 'DateTimeBox');
    const commitDateClass = cn(commitClass(), 'DateTime');

    return (
        <div className={commitClass({detail: !!props.detail})}>
            <div className={commitContentClass()}>
                <div className={commitContentRowClass()}>
                    <IconLabel mix={commitItemClass()} large out type={props.type}>#{props.number}</IconLabel>
                    <div className={commitItemClass({title: true})}>{props.description}</div>
                </div>
                <div className={commitContentRowClass()}>
                    <div className={commitItemClass()}>
                        <IconLabel type="branch">{props.branch}</IconLabel>
                        <div className={commitIdClass()}>{props.hex ? props.hex.substring(0, 5): null}</div>
                    </div>
                    <IconLabel type="author" mix={commitItemClass({author: true})}>{props.author}</IconLabel>
                </div>
            </div>
            <div className={commitDateBoxClass()}>
                <IconLabel type="date" mix={commitDateClass()}>{props.date}</IconLabel>
                <IconLabel type="timeInterval" mix={commitDateClass({interval: true})}>
                    {props.interval}
                </IconLabel>
            </div>
        </div>
    );
}