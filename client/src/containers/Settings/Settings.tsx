import React from 'react';
import '../../style.css';
import '../../vars.css';

import LayoutContent from "../../hoc/Layout/Layout-Content";
import Page from "../Page/Page";
import SettingsForm from "../../components/SettingsForm/SettingsForm";

const Settings: React.FC<never> = () => {
    const header = {
        logo: true,
        text: 'School CI Server',
        link: '/',
        buttons: []
    };

    return (
        <Page header={header}>
            <LayoutContent top="l">
                <SettingsForm/>
            </LayoutContent>
        </Page>
    );
};

export default Settings;