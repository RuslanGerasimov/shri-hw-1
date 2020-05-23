import React, {Suspense, useEffect} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from "react-redux";

import * as actions from './store/main/actions';
import './style.css';
import './vars.css';

import Start from "./containers/Start/Start";
import Settings from "./containers/Settings/Settings";
import Build from "./containers/Build/Build";
import Builds from "./containers/Builds/Builds";
import Initialization from "./containers/Start/Initialization";
import {ThunkDispatch} from "redux-thunk";

interface AppProps {
    initApp: () => void,
    initialized: boolean,
    settingsExists: boolean
}

const App: React.FC<AppProps> = (props) => {
    useEffect(() => {
        props.initApp();
    });

    return (
        <BrowserRouter>
            <Switch>
                {props.initialized ? (
                    <Suspense fallback="loading...">
                        <Route path="/settings" component={Settings}/>
                        <Route path="/build/:id" component={Build}/>
                        <Route path="/logs" component={Builds}/>
                        <Route exact path="/" component={props.settingsExists ? Builds : Start}/>
                    </Suspense>
                ) : (
                    <Suspense fallback="loading...">
                        <Initialization/>
                    </Suspense>
                )}
            </Switch>
        </BrowserRouter>
    );
};

const mapsDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        initApp: () => {
            dispatch(actions.initApp())
        }
    }
};

const mapStateToProps = (state: {main: { appInitialized: boolean }, settings: { id?: string }}) => {
    return {
        initialized: state.main.appInitialized,
        settingsExists: !!state.settings.id
    }
};

export default connect(mapStateToProps, mapsDispatchToProps)(App);
