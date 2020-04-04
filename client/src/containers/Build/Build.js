import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import '../../style.css';
import '../../vars.css';

import Button from "../../ui/Button/Button";
import LayoutContent from "../../hoc/Layout/Layout-Content";
import Log from "../../components/Log/Log";
import Page from "../Page/Page";
import DetailCommit from "../../components/DetailCommit/DetailCommit";
import apiAxiosInstance from "../../services/axios";
import {connect} from "react-redux";

const data = {
    type: 'success',
    number: '1368',
    description: 'add documentation for postgres scaler',
    branch: 'master',
    hex: '9c9f0b9',
    author: 'Philip Kirkorov',
    date: '21 янв, 03:06',
    interval: '1 ч 20 мин',
    log: `\x1b[30mblack\x1b[37mwhite`
};


const Build = (props) => {
    const [rebuildDisabled, setRebuildDisabled] = useState(!props.commitHash);

    useEffect(() => {
        if (props.commitHash) {
            setRebuildDisabled(false);
        }
    }, [props.commitHash]);

    const history = useHistory();
    const buildId = props.match.params.id;

    const rebuild = () => {
        apiAxiosInstance.post('/build/request', {commitHash: props.commitHash})
            .then((result) => {
                const id = result.data;
                history.push('/build/' + id);
            }).catch(() => {

        })
    };


    const buttons = [
        <Button disabled={rebuildDisabled} text="Rebuild" clicked={rebuild} key="rebuild" type="rebuild"/>,
        <Button type="settings" link="/settings" key="settings"/>,
    ];

    const header = {
        logo: false,
        text: props.title ? props.title : 'philip1967/my-awesome-repo',
        link: "/",
        buttons: buttons
    };


    return (
        <Page header={header}>
            <LayoutContent top="m" noSpace="bottom">
                <DetailCommit buildId={buildId}/>
            </LayoutContent>
            <LayoutContent mobileFull noSpace="top">
                <Log>{data.log}</Log>
            </LayoutContent>
        </Page>
    );
};

const mapStateToProps = state => {
    return {
        commitHash: state.build.commitHash,
        title: state.settings.repo
    }
};

export default connect(mapStateToProps, null)(Build)