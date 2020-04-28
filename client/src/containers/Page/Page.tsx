import React from "react";
import {cn} from "@bem-react/classname";

import Theme from "../../hoc/Theme/Theme";
import Layout from "../../hoc/Layout/Layout";
import LayoutWrapper from "../../hoc/Layout/Layout-Wrapper";
import LayoutFooter from "../../hoc/Layout/Layout-Footer";
import Header, {HeaderProps, titleTypes} from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export interface PageProps {
    header: {
        logo: boolean,
        text: string,
        link: string
    }
}

const Page: React.FC<PageProps> = (props) => {
    const headerProps: HeaderProps = {
        buttons: [],
        mix: cn('Layout', 'Header')(),
        title: {
            type: props.header.logo ? titleTypes.logo : titleTypes.text,
            text: props.header.text,
            link: props.header.link
        }
    };

    return (
        <Theme default>
            <Layout>
                <Header title={headerProps.title} mix={headerProps.mix} buttons={[]} />
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
};

export default Page;