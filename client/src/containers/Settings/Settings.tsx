import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../style.css';
import '../../vars.css';

import LayoutContent from "../../hoc/Layout/Layout-Content";
import Page from "../Page/Page";
import SettingsForm from "../../components/SettingsForm/SettingsForm";

const Settings: React.FC = () => {
    const {t} = useTranslation();
    const header = {
        logo: true,
        text: t('appTitle'),
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