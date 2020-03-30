import React from 'react';

import '../../style.css';
import '../../vars.css';

import Button from "../../ui/Button/Button";
import LayoutContent from "../../hoc/Layout/Layout-Content";
import Page from "../Page/Page";
import Commits from "../../components/Commits/Commits";

const Builds = (props) => {
    const buttons = [
        <Button text="Run build" key="play" type="play" />,
        <Button link="/settings" type="settings" key="settings" />,
    ];

    const header = {
        logo: false,
        text: 'philip1967/my-awesome-repo',
        buttons: buttons
    };

    return (
        <Page header={header}>
            <LayoutContent top="m">
                <Commits />
            </LayoutContent>
        </Page>
    );
};

export default Builds;