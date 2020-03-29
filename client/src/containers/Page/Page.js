import React from "react";
import {cn} from "@bem-react/classname";

import Theme from "../../hoc/Theme/Theme";
import Layout from "../../hoc/Layout/Layout";
import LayoutWrapper from "../../hoc/Layout/Layout-Wrapper";
import LayoutFooter from "../../hoc/Layout/Layout-Footer";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default (props) => {
    return (
        <Theme default>
            <Layout>
                <Header mix={cn('Layout', 'Header')()}
                    title={{type: props.header.logo ? 'logo' : 'text', text: props.header.text, link: props.header.link}}
                    buttons={props.header.buttons}/>
                <LayoutWrapper>
                    {props.children}
                </LayoutWrapper>
                <LayoutFooter>
                    <Footer copyright={"© 2020 Your Name"}
                            links={[{id: 'Support', text: 'Support'}, {id: "Learning", text: 'Learning'}]}/>
                </LayoutFooter>
            </Layout>
        </Theme>
    );
}