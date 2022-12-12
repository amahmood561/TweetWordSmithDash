import React, {useState, useEffect, SetStateAction} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Routes} from "../../routes";

import {DashboardOverviewInfo} from "../dashboard/DashboardOverviewInfo";
import {Login} from "../login/login";
// components
import Sidebar from "../../pageWidgets/Sidebar";
import Navbar from "../../pageWidgets/Navbar";
import Footer from "../../pageWidgets/Footer";
import Preloader from "../../pageWidgets/Preloader";
import {Compose} from "../compose/compose";
import {Calendar} from "../calendar/calendar";

const tkValidator = () => {
    var existingToken = localStorage.getItem("token")
    //is token undefined from storage check url
    if (existingToken === 'undefined') {
        var req_url = window.location.hash;
        var HashKeyValueParsed_JSON = {};
        require('url').parse(req_url).hash.substring(1).split('?').forEach(function (x) {
            var arr = x.split('=');
            arr[1] && (HashKeyValueParsed_JSON[arr[0]] = arr[1]);
        });

        //if token is undefined from url send to login page
        if (HashKeyValueParsed_JSON.token === 'undefined') {
            window.location.href = window.location.origin + '/#/'
        }
        //set item in storage for use
        localStorage.setItem("token", HashKeyValueParsed_JSON.token)
    }

}

const RouteWithLoader = ({component: Component, ...rest}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true}/> <Component {...props} /> </>)}/>
    );
};

const RouteWithSidebar = ({component: Component, ...rest}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const localStorageIsSettingsVisible = () => {
        return localStorage.getItem('settingsVisible') === 'false' ? false : true
    }
    const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

    tkValidator();

    const toggleSettings = () => {
        setShowSettings(!showSettings);
        localStorage.setItem('settingsVisible', !showSettings);
    }

    const [usrData, usrDataSetter] = useState(null);
    const setUsrData = (newData) => {
        usrDataSetter({usrData: newData})
    }

    return (
        <Route {...rest} render={props => (
            <>
                <Preloader show={loaded ? false : true}/>
                <Sidebar/>
                <main className="content">
                    <Navbar usrData={usrData} {...props}/>
                    <Component setUsrData={setUsrData}  usrData={usrData} {...props} />
                    <Footer toggleSettings={toggleSettings} showSettings={showSettings}/>
                </main>
            </>
        )}
        />
    );
};

export default () => (
    <Switch>
        <RouteWithLoader exact path={Routes.Presentation.path} component={Login}/>
        <RouteWithLoader exact path={Routes.Signin.path} component={Login}/>
        <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverviewInfo}/>
        <RouteWithSidebar exact path={Routes.Compose.path} component={Compose}/>
        <RouteWithSidebar exact path={Routes.Calendar.path} component={Calendar}/>

    </Switch>
);
