import React, {ReactElement} from "react";
import {cn} from "@bem-react/classname";
import {useTranslation} from "react-i18next";

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
        link: string,
        buttons: Array<ReactElement>
    }
}

const Page: React.FC<PageProps> = (props) => {
    const {t, i18n} = useTranslation();
    const headerProps: HeaderProps = {
        buttons: props.header.buttons,
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
                <Header title={headerProps.title} mix={headerProps.mix} buttons={headerProps.buttons} />
                <LayoutWrapper>
                    {props.children}
                </LayoutWrapper>
                <LayoutFooter>
                    <Footer copyright={t('footer.copyright')}
                            links={[
                                {id: 'Support', text: t('footer.links.support')},
                                {id: "Learning", text: t('footer.links.learning')},
                                {id: "Lang", text: t('footer.links.lang'), onClick: () => { i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru') }},
                            ]}/>
                </LayoutFooter>
            </Layout>
        </Theme>
    );
};

export default Page;