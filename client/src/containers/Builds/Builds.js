import React from 'react';
import { useHistory } from 'react-router-dom';

import '../../style.css';
import '../../vars.css';

import Button from "../../ui/Button/Button";
import LayoutContent from "../../hoc/Layout/Layout-Content";
import Commit from "../../ui/Commit/Commit";
import Page from "../Page/Page";

const data = [
    {
        type: 'success',
        number: '1368',
        description: 'add documentation for postgres scaler',
        branch: 'master',
        hex: '9c9f0b9',
        author: 'Philip Kirkorov',
        date: '21 янв, 03:06',
        interval: '1 ч 20 мин'
    },
    {
        type: 'error',
        number: '1367',
        description: 'Super cool UI kit for making websites that look like games of old.',
        branch: 'super-cool-ui-kit',
        hex: '952e5567',
        author: 'Vadim Makeev',
        date: '21 янв, 03:06',
        interval: '1 ч 20 мин'
    },
    {
        type: 'waiting',
        number: '1366',
        description: 'upgrade typescript to 3.8',
        branch: 'master',
        hex: 'b4636ab',
        author: 'Philip Kirkorov',
        date: '21 янв, 03:06',
        interval: '1 ч 20 мин'
    }
];


export default (props) => {
    const history = useHistory();
    const openDetail = (id) => {
        history.push('/build/' + id);
    };

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
                {data.map((item) => <Commit clicked={openDetail.bind(null, item.hex)} {...item} key={item.hex}/>)}
            </LayoutContent>
        </Page>
    );
};