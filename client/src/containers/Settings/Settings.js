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
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";

const inputs = [
    {
        input: <InputField label="GitHub repository" placeholder="user-name/repo-name" id="repo" key="repo" showClear compulsory/>,
        id: 'repo'
    },
    {
        input: <InputField label="Build command" value="npm run build" placeholder="npm run build" id="buildCommand" key="buildCommand" showClear/>,
        id: 'buildCommand'
    },
    {
        input: <InputField label="Main branch" placeholder="master" id="mainBranch" key="mainBranch" showClear/>,
        id: 'mainBranch'
    },
    {
        input: <InputField label="Synchronize every" placeholder="10" unit="minutes" id="interval" key="interval" inline/>,
        id: 'interval',
        topSpace: true
    },
];

const Settings = (props) => {
    return (
        <Theme default>
            <Layout>
                <LayoutHeader>
                    <Header title={{type: 'logo', text: 'School CI Server'}} />
                </LayoutHeader>
                <LayoutWrapper>
                    <LayoutContent top="l">
                        <Form title="Settings"
                            description="Configure repository connection and synchronization settings."
                            fields={inputs}/>
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