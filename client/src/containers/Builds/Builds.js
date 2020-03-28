import React from 'react';
import '../../style.css';
import '../../vars.css';

import Button from "../../components/Button/Button";
import Theme from "../../hoc/Theme/Theme";
import Header from "../../containers/Header/Header";
import Layout from "../../hoc/Layout/Layout";
import LayoutHeader from "../../hoc/Layout/Layout-Header";
import LayoutWrapper from "../../hoc/Layout/Layout-Wrapper";
import LayoutContent from "../../hoc/Layout/Layout-Content";
import LayoutFooter from "../../hoc/Layout/Layout-Footer";
import Footer from "../Footer/Footer";
import Commit from "../../components/Commit/Commit";

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
        type: 'warning',
        number: '1366',
        description: 'upgrade typescript to 3.8',
        branch: 'master',
        hex: 'b4636ab',
        author: 'Philip Kirkorov',
        date: '21 янв, 03:06',
        interval: '1 ч 20 мин'
    }
];


const Settings = (props) => {

    const buttons = [
        <Button text="Run build" key="play" type="play" />,
        <Button type="settings" key="settings" />,
    ];

    return (
        <Theme default>
            <Layout>
                <LayoutHeader>
                    <Header title={{text: 'philip1967/my-awesome-repo'}} buttons={buttons} />
                </LayoutHeader>
                <LayoutWrapper>
                    <LayoutContent top="m">
                        {data.map((item) => <Commit {...item} key={item.hex}/>)}
                    </LayoutContent>
                </LayoutWrapper>
                <LayoutFooter>
                    <Footer copyright={"© 2020 Your Name"}
                            links={[{id: 'Support', text: 'Support'}, {id: "Learning", text: 'Learning'}]}/>
                </LayoutFooter>
            </Layout>
        </Theme>
    );
};

export default Settings;