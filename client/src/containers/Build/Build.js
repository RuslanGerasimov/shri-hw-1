import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
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
    log: `Starting type checking and linting service...
       Using 1 worker with 2048MB memory limit
       Hash: d54ed20309f352b3bda76cbbb6d272ed6afde438bd7a265eb08db3624c32dfc883a8c379c67f4de6
       Version: webpack 4.41.6
       Child
       Hash: d54ed20309f352b3bda7
       Time: 40364ms
       Built at: 2020-02-23 16:04:54
       Asset      Size  Chunks             Chunk Names
       0.bundle.static.css  1.31 MiB       0  [emitted]  vendors~main
       0.bundle.static.js  10.3 MiB       0  [emitted]  vendors~main
       bundle.static.css  48.6 KiB       1  [emitted]  main
       bundle.static.js   613 KiB       1  [emitted]  main
       static/media/Cat.afa2191f.svg  9.83 KiB          [emitted]
       static/media/illustration.a17c1b18.svg  14.8 KiB          [emitted]
       static/media/picture.eef6f3b8.svg  16.2 KiB          [emitted]
       Entrypoint main = 0.bundle.static.css 0.bundle.static.js bundle.static.css bundle.static.js
       [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
       [./src/account/actions/index.ts] 2.46 KiB {1} [built]
       [./src/account/api/lib/models/index.ts] 2.17 KiB {1} [built]
       [./src/account/api/lib/models/mappers.ts] 21 KiB {1} [built]
       [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {1} [built]
       [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {1} [built]
       [./src/account/epics/index.ts] 328 bytes {1} [built]
       [./src/account/epics/pageData.ts] 834 bytes {1} [built]
       [./src/account/epics/personalPage.ts] 2.29 KiB {1} [built]
       [./src/account/epics/registrationForm.ts] 910 bytes {1} [built]
       [./src/account/index.tsx] 561 bytes {1} [built]
       [./src/account/reducers/githubRepos.ts] 837 bytes {1} [built]
       [./src/account/reducers/index.ts] 1.83 KiB {1} [built]
       [./src/account/reducers/serverError.ts] 526 bytes {1} [built]
       [./src/account/store.ts] 1.05 KiB {1} [built]
       + 1864 hidden modules
       Child
       Hash: 6cbbb6d272ed6afde438
       Time: 32877ms
       Built at: 2020-02-23 16:04:47
       Asset      Size  Chunks             Chunk Names
       server.js  6.34 MiB    main  [emitted]  main
       Entrypoint main = server.js
       [./src/account/actions/index.ts] 2.46 KiB {main} [built]
       [./src/account/api/lib/models/index.ts] 2.17 KiB {main} [built]
       [./src/account/api/lib/models/mappers.ts] 21 KiB {main} [built]
       [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {main} [built]
       [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {main} [built]
       [./src/account/epics/index.ts] 328 bytes {main} [built]
       [./src/account/epics/pageData.ts] 834 bytes {main} [built]
       [./src/account/epics/personalPage.ts] 2.29 KiB {main} [built]
       [./src/account/epics/registrationForm.ts] 910 bytes {main} [built]
       [./src/account/mappers/index.ts] 2.18 KiB {main} [built]
       [./src/account/reducers/githubRepos.ts] 837 bytes {main} [built]
       [./src/account/reducers/index.ts] 1.83 KiB {main} [built]
       [./src/account/reducers/serverError.ts] 526 bytes {main} [built]
       [./src/account/server.tsx] 1.62 KiB {main} [built]
       [./src/account/store.ts] 1.05 KiB {main} [built]
       + 1484 hidden modules`
};


const Build = (props) => {
    const [rebuildDisabled, setRebuildDisabled] = useState(!props.commitHash);

    useEffect(() => {
        if(props.commitHash) {
            setRebuildDisabled(false);
        }
    }, [props.commitHash]);

    const history = useHistory();
    const buildId = props.match.params.id;

    const rebuild = () => {
        apiAxiosInstance.post('/build/request', { commitHash: props.commitHash})
            .then((result) => {
                const id = result.data;
                history.push('/build/' + id);
            }).catch(() => {

            })
    };


    const buttons = [
        <Button disabled={rebuildDisabled} text="Rebuild" clicked={rebuild} key="rebuild" type="rebuild" />,
        <Button type="settings" link="/settings" key="settings" />,
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