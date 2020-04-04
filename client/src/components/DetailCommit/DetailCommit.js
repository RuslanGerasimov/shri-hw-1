import React, {useEffect} from "react";
import * as actions from "../../store/build/actions";
import {connect} from "react-redux";
import Commit from "../../ui/Commit/Commit";
import {formatDate, formatDuration} from "../../services/formatter";

const DetailCommit = (props) => {
    useEffect(() => {
        props.fetchBuild(props.buildId);
    }, [ props.buildId ]);

    const commitType = props.status ? props.status.toLowerCase() : null;
    const formattedDate = formatDate(props.start);
    const duration = formatDuration(props.duration);


    return commitType ? (<Commit
        detail
        number={props.buildNumber}
        description={props.commitMessage}
        branch={props.branchName}
        hex={props.buildId}
        author={props.authorName}
        type={commitType}
        date={formattedDate ? formattedDate : '-'}
        interval={duration ? duration : '-'} />) : null;
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchBuild: (buildId) => { dispatch(actions.fetchBuild(buildId)) }
    }
};

const mapStateToProps = state => {
    return {
        status: state.build.status,
        start: state.build.start,
        duration: state.build.duration,
        buildNumber: state.build.buildNumber,
        commitMessage: state.build.commitMessage,
        branchName: state.build.branchName,
        authorName: state.build.authorName
    }
};

export default connect(mapStateToProps, mapsDispatchToProps)(DetailCommit);