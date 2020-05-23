import React, {useEffect} from "react";
import * as actions from "../../store/build/actions";
import {connect} from "react-redux";
import Commit from "../../ui/Commit/Commit";
import {formatDate, formatDuration} from "../../services/formatter";
import {ThunkDispatch} from "redux-thunk";
import {Build} from "../../store/builds/types";
import {useTranslation} from "react-i18next";


export interface DetailCommitProps extends Build{
    fetchBuild: (buildId: string) => void,
}

const DetailCommit: React.FC<DetailCommitProps> = (props) => {
    const {t, i18n} = useTranslation();
    useEffect(() => {
        props.fetchBuild(props.id);
    }, [ props.id ]);

    const commitType = props.status ? props.status.toLowerCase() : null;
    const formattedDate = formatDate(props.start, i18n.language);
    const duration = formatDuration(props.duration, i18n.language);
    const interval: string = duration ? t('interval', { hours: duration.hours, minutes: duration.minutes }) : '-';

    return commitType ? (<Commit
        detail
        number={props.buildNumber}
        description={props.commitMessage}
        branch={props.branchName}
        hex={props.id}
        author={props.authorName}
        type={commitType}
        date={formattedDate ? formattedDate : '-'}
        interval={interval} />) : null;
};

const mapsDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        fetchBuild: (buildId: string) => { dispatch(actions.fetchBuild(buildId)) }
    }
};

const mapStateToProps = (state: { build:Build }) => {
    return {
        status: state.build.status,
        start: state.build.start,
        duration: state.build.duration,
        buildNumber: state.build.buildNumber,
        commitMessage: state.build.commitMessage,
        commitHash: state.build.commitHash,
        branchName: state.build.branchName,
        authorName: state.build.authorName
    }
};

export default connect(mapStateToProps, mapsDispatchToProps)(DetailCommit);