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
import ActionCard from "../../components/ActionCard/ActionCard";
import Footer from "../Footer/Footer";

function App() {
    return (
        <Theme default>
            <Layout>
                <LayoutHeader>
                    <Header title={{type: 'logo', text: 'School CI Server'}}
                            buttons={[<Button type="settings" text="Settings"/>]}/>
                </LayoutHeader>
                <LayoutWrapper>
                    <LayoutContent centered>
                        <ActionCard
                            button={<Button large primary text="Open settings"/>}
                        />
                    </LayoutContent>
                </LayoutWrapper>
                <LayoutFooter>
                    <Footer copyright={"© 2020 Your Name"}
                            links={[{text: 'Support'}, {text: 'Learning'}]}/>
                </LayoutFooter>
            </Layout>
        </Theme>
    );
}

export default App;