import React, {useState} from 'react';

import '../../style.css';
import '../../vars.css';

import Button from "../../ui/Button/Button";
import LayoutContent from "../../hoc/Layout/Layout-Content";
import Page from "../Page/Page";
import Commits from "../../components/Commits/Commits";
import ModalBackDrop from "../../ui/ModalBackDrop/ModalBackDrop";
import BuildForm from "../../components/BuildForm/BuildForm";
import {connect} from "react-redux";
import {Settings} from "../../store/settings/type";

const Builds: React.FC<{title?: string}> = (props) => {
    const [buildModal, setBuildModal] = useState(false);
    const buttons = [
        <Button text="Run build" clicked={() => { setBuildModal(!buildModal) }} key="play" type="play" />,
        <Button link="/settings" type="settings" key="settings"  />,
    ];

    const modal = '';

    const header = {
        logo: false,
        text: props.title ? props.title : 'philip1967/my-awesome-repo',
        link: "/",
        buttons: buttons
    };

    const closeModal = () => { setBuildModal(false) };
    return (
        <Page header={header}>
            <LayoutContent top="m">
                <Commits />
                <ModalBackDrop show={buildModal} backDropClicked={closeModal}>
                    <BuildForm resetHandler={closeModal} />
                </ModalBackDrop>
            </LayoutContent>
        </Page>
    );
};


const mapStateToProps = (state: { settings: Settings }) => {
    return {
        title: state.settings.repo
    }
};

export default connect(mapStateToProps, null)(Builds)