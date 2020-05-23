import React  from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../style.css';
import '../../vars.css';

import Button from "../../ui/Button/Button";
import LayoutContent from "../../hoc/Layout/Layout-Content";
import ActionCard from "../../ui/ActionCard/ActionCard";
import Page from "../Page/Page";

const Start: React.FC = () => {
    const { t, i18n } = useTranslation();

    const header = {
        logo: true,
        text: t('appTitle'),
        link: '/',
        buttons: [
            <Button link="/settings" key="settings" type="settings" text={t('buttons.settings')}/>
        ]
    };

    return (
            <Page header={header}>
                <LayoutContent centered>
                    <ActionCard
                        button={<Link to="/settings"><Button large primary text={t('buttons.openSettings')}/></Link>}
                    />
                </LayoutContent>
            </Page>
    );
};

export default Start;