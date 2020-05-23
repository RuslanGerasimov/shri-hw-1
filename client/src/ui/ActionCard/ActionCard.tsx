import React, { Fragment } from "react";
import {cn} from "@bem-react/classname";
import { useTranslation } from "react-i18next";

import './ActionCard.css';
import './ActionCard-Button.css';
import './ActionCard-Description.css';
import './ActionCard-Image.css';


const ActionCard: React.FC<{ description?: string, button?:React.ReactElement }> = (props) => {
    const blockClass = cn('ActionCard');
    const imageClass = cn(blockClass(), 'Image');
    const descClass = cn(blockClass(), 'Description');
    const buttonClass = cn(blockClass(), 'Button');
    const {t} = useTranslation();

    return (
        <div className={blockClass()}>
            <div className={imageClass()} />
            <div className={descClass()}>
                {props.description ? props.description
                    : <Fragment>{t('init.description.firstRow')}<br />{t('init.description.secondRow')}</Fragment>}
            </div>
            {props.button ? (<div className={buttonClass()}>
                {props.button}
            </div>) : null}
        </div>
    );
};

export default ActionCard;