import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Login } from '../screens/Login';
import { DashboardRoute } from './DashboardRoute';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/" component={DashboardRoute} />
                </Switch>
            </div>
        </Router>
    )
}
