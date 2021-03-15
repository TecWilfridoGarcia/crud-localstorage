import React from 'react';
import { SideBar } from '../components/SideBar/SideBar';
import {
    Switch, Route,
} from "react-router-dom";
import { Home } from '../screens/Home/Home';

export const DashboardRoute = () => {
    return (
        <>
        <SideBar />
            <div>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
            </div>
        </>
    )
}

