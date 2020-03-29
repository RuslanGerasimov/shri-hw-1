import React, {useEffect} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {connect} from "react-redux";

import * as actions from './store/main/actions';
import './style.css';
import './vars.css';

import Start from "./containers/Start/Start";
import Settings from "./containers/Settings/Settings";
import Build from "./containers/Build/Build";
import Builds from "./containers/Builds/Builds";
import Initialization from "./containers/Start/Initialization";

const  App = (props) => {
    useEffect(() => {
        props.initApp();
    });

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/settings" component={Settings} />
                <Route path="/build/:id" component={Build} />
                <Route path="/logs" component={Builds} />
                <Route path="/" component={props.settingsExists ? Builds: (props.initialized ? Start : Initialization)} />
            </Switch>
        </BrowserRouter>
    );
};

const mapsDispatchToProps = (dispatch) => {
    return {
        initApp: () => { dispatch(actions.initApp()) }
    }
};

const mapStateToProps = state => {
    return {
        initialized: state.main.appInitialized,
        settingsExists: state.settings.repo ? true : false
    }
};

export default connect(mapStateToProps, mapsDispatchToProps)(App);
