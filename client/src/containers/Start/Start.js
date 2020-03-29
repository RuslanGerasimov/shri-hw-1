import React from 'react';
import { Link } from 'react-router-dom';
import '../../style.css';
import '../../vars.css';

import Button from "../../ui/Button/Button";
import LayoutContent from "../../hoc/Layout/Layout-Content";
import ActionCard from "../../ui/ActionCard/ActionCard";
import Page from "../Page/Page";

const Start = () => {
    const header = {
        logo: true,
        text: 'School CI Server',
        link: '/',
        buttons: [<Button link="/settings" key="settings" type="settings" text="Settings"/>]
    };

    return (
        <Page header={header}>
            <LayoutContent centered>
                <ActionCard
                    button={<Link to="/settings"><Button large primary text="Open settings"/></Link>}
                />
            </LayoutContent>
        </Page>
    );
}

export default Start;