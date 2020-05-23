import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../style.css';
import '../../vars.css';

import LayoutContent from "../../hoc/Layout/Layout-Content";
import ActionCard from "../../ui/ActionCard/ActionCard";
import Page from "../Page/Page";

const Initialization: React.FC = () => {
    const { t, i18n } = useTranslation();
    const header = {
        logo: true,
        text: t('appTitle'),
        link: '/',
        buttons: []
    };

    return (
        <Page header={header}>
            <LayoutContent centered>
                {t('buttons.settings')}
                <ActionCard
                    description="Initialization"/>
            </LayoutContent>
        </Page>
    );
};

export default Initialization;