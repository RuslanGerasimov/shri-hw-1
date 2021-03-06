import React, {Fragment, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import * as actions from "../../store/builds/actions";
import {connect} from "react-redux";
import Commit from "../../ui/Commit/Commit";
import {formatDate, formatDuration} from '../../services/formatter';
import {ThunkDispatch} from "redux-thunk";
import {Build} from "../../store/builds/types";



export interface CommitsPros {
    fetchBuilds: () => void,
    builds: Array<Build>
}

const mapsDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        fetchBuilds: () => { dispatch(actions.fetchBuilds()) }
    }
};

const Commits: React.FC<CommitsPros> = (props) => {
    const history = useHistory();
    useEffect(() => {
        props.fetchBuilds();
    }, []);

    const builds = props.builds.map((item) => {
        const commitType = item.status.toLowerCase();
        const formattedDate = formatDate(item.start);
        const duration = formatDuration(item.duration);

        return <Commit
            number={item.buildNumber}
            description={item.commitMessage}
            branch={item.branchName}
            hex={item.id}
            author={item.authorName}
            type={commitType}
            date={formattedDate ? formattedDate : '-'}
            interval={duration ? duration : '-'}
            clicked={() => {history.push('/build/' + item.id)}}  key={item.id}/>;
    });
    return (
        <Fragment>
            {builds}
        </Fragment>
    )
};

const mapStateToProps = (state: {builds: { builds: Array<Build> }}) => {
    return {
        builds: state.builds.builds
    }
};

export default connect(mapStateToProps, mapsDispatchToProps)(Commits);