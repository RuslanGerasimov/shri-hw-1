import React from 'react';
import { Link } from 'react-router-dom';
import '../../style.css';
import '../../vars.css';

import Button from "../../ui/Button/Button";
import LayoutContent from "../../hoc/Layout/Layout-Content";
import ActionCard from "../../ui/ActionCard/ActionCard";
import Page from "../Page/Page";

function Initialization() {
    const header = {
        logo: true,
        text: 'School CI Server',
        link: '/',
        buttons: []
    };

    return (
        <Page header={header}>
            <LayoutContent centered>
                <ActionCard
                    description="Initialization"
                />
            </LayoutContent>
        </Page>
    );
}

export default Initialization;