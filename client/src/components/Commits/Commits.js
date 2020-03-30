import React, {useEffect} from "react";
import { useHistory } from 'react-router-dom';
import * as actions from "../../store/builds/actions";
import {connect} from "react-redux";
import Commit from "../../ui/Commit/Commit";
import {formatDate, formatDuration} from '../../services/formatter';

const Commits = (props) => {
    const history = useHistory();
    useEffect(() => {
        props.fetchBuilds();
    }, []);

    return props.builds.map((item) => {
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
};

const mapsDispatchToProps = (dispatch) => {
    return {
        fetchBuilds: () => { dispatch(actions.fetchBuilds()) }
    }
};

const mapStateToProps = state => {
    return {
        builds: state.builds.builds
    }
};

export default connect(mapStateToProps, mapsDispatchToProps)(Commits);