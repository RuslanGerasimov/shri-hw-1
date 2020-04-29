import React from 'react';
import '../../style.css';
import '../../vars.css';

import LayoutContent from "../../hoc/Layout/Layout-Content";
import ActionCard from "../../ui/ActionCard/ActionCard";
import Page from "../Page/Page";

const Initialization: React.FC = () => {
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
                    description="Initialization"/>
            </LayoutContent>
        </Page>
    );
};

export default Initialization;